<?php

// This File Will Manage All AJAX requests.

Require "DBconnection.php";

// Log errors to a file
ini_set('log_errors', 1);
ini_set('error_log', 'ERRRRlogs.txt');
error_reporting(E_ALL);


$response = array();  // Initialize response array

// Define the directory where files will be uploaded

$CurrentUser = "default";
$CurrentUserID = "1";


if(isset($_POST['PROCESSname']))
    {
        if($_POST['PROCESSname']=="upload_assets")
            {
                $CurrentUser = $_POST['UserName'];
                $CurrentUserID = $_POST['UserID'];
                $uploadDir = "../uploads/".$CurrentUser."/";

                // Check if the directory exists, if not, create it
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);  // Create the directory with permissions and allow subdirectories
                }


                // Check if a file was uploaded and if it was uploaded successfully
                if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
                    $fileName = $_FILES['file']['name'];  // Get the uploaded file's original name
                    $filePath = $uploadDir . basename($fileName);  // Define the file's destination path

                    // Move the uploaded file to the 'uploads' directory
                    if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
                        $response["file"] = "File uploaded successfully: " . $fileName;  // Success message

                        try {
                            // Prepare the SQL query to insert the file path into the database
                            $stmt = $pdo->prepare("INSERT INTO uploads (assets_name, assets_folder, user_id) VALUES (:assets_name, :assets_folder, :user_id)");

                            // Bind the parameters to the actual values
                            $filePath= substr($filePath, 3);
                            $stmt->bindParam(':assets_name', $filePath , PDO::PARAM_STR);
                            $stmt->bindParam(':assets_folder', $CurrentUser, PDO::PARAM_STR);
                            $stmt->bindParam(':user_id', $CurrentUserID, PDO::PARAM_INT);

                            // Execute the query
                            if ($stmt->execute()) {
                                $response["message"] = "File uploaded and saved to the database successfully.";
                            } else {
                                $response["message"] = "Database error: Could not save the file path.";
                            }

                        } catch (PDOException $e) {
                            // If an error occurs (PDO exception)
                            $response["message"] = "Database connection error: " . $e->getMessage();
                        }

                        // PDO does not require closing the connection manually, but you can do it if needed
                        //$pdo = null;
                    }
                }

                    else {
                        $response["file"] = "Failed to move the uploaded file.";  // Error message if move fails
                        }
                }
                elseif($_POST['PROCESSname']=="getting_assets")
                {
                    try {
                        // Fetch image paths from the database
                        $stmt = $pdo->prepare("SELECT id, assets_name FROM uploads");
                        $stmt->execute();
                        $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

                        // Return the image paths as JSON
                        echo json_encode($images);

                    } catch (PDOException $e) {echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);}

                }
                elseif($_POST['PROCESSname']=="DeletsImg")
                {
                    // Set the ID of the row to delete
                    $imgID  = $_POST['Informations'];

                    $stmt = $pdo->prepare("SELECT assets_name FROM uploads WHERE id = :id");
                    $stmt->bindParam(":id", $imgID, PDO::PARAM_INT);
                    $stmt->execute();
                    $ValueToDelete = $stmt->fetch(PDO::FETCH_ASSOC);

                    if ($ValueToDelete) {

                        try {


                            // Prepare the DELETE statement
                            $sql = "DELETE FROM uploads WHERE id = :id";
                            $stmt = $pdo->prepare($sql);

                            // Bind the parameter
                            $stmt->bindParam(":id", $imgID, PDO::PARAM_INT);

                            // Execute the statement
                            if ($stmt->execute()) {
                                //echo "Record deleted successfully.";
                            } else {
                               // echo "Error deleting record.";
                            }



                            $UserName  = $_POST['UserName'];
                            $ValueToDelete = basename($ValueToDelete["assets_name"]);
                            $file = "../uploads/".$UserName."/" . $ValueToDelete;



                            // Check if the file exists before attempting to delete it
                            if (file_exists($file)) {
                                // Delete the file
                                if (unlink($file)) {
                                    //echo "File deleted successfully.";
                                } else {
                                    //echo "Error: Unable to delete the file.";
                                }
                            }


                        } catch (PDOException $e) {
                            //echo "Error: " . $e->getMessage();
                        }


                    }

                    // Close the connection
                    $pdo = null;

                }
                elseif($_POST['PROCESSname']=="RenameIMG")
                {



                        $Informations  = $_POST['anotherInformations'];
                        $imgID  = $_POST['Informations'];
                        $UserName  = $_POST['UserName'];
                        $newFilePath ="uploads/" . $UserName . "/" . $Informations;


                        $stmt = $pdo->prepare("SELECT assets_name FROM uploads WHERE id = :id");
                        $stmt->bindParam(":id", $imgID, PDO::PARAM_INT);
                        $stmt->execute();
                        $ValueToDelete = $stmt->fetch(PDO::FETCH_ASSOC);

                        if ($ValueToDelete) {
                            rename("../".$ValueToDelete["assets_name"],"../". $newFilePath);

                            $sql = "UPDATE uploads SET assets_name = :assets_name WHERE id = :id";

                            $stmt = $pdo->prepare($sql);

                            $stmt->bindParam(':assets_name', $newFilePath);
                            $stmt->bindParam(':id', $imgID);

                            $stmt->execute();

                         }









                }
        else {
                    $response["file"] = "No file uploaded or there was an error with the upload.";  // Error handling
                }





    }