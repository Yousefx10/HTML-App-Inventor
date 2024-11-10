<?php

// This File Will Manage All AJAX requests.

Require "DBconnection.php";




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
                            $stmt->bindParam(':assets_name', $filePath, PDO::PARAM_STR);
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
                } else {
                    $response["file"] = "No file uploaded or there was an error with the upload.";  // Error handling
                }





    }

// Return the response as JSON
echo $response;
