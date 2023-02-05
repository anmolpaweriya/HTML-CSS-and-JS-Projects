

<?php


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // print_r($_FILES);

    $user = $_POST['playlistName'];


    $tmp_name = $_FILES['files']['tmp_name'][0];
    $size = $_FILES['files']['size'][0];
    $name = $_POST['fileName'];

    // print_r($_FILES);
    // print_r($_POST);



    if ($size > 100000000) {
        echo var_dump($size);
        echo "file is too big , max size of uploading file is 10MB";
        // exit();
    } elseif (!file_exists("../playlists/$user/" . $name)) {


        if (!file_exists("../playlists/$user")) {
            mkdir("../playlists/$user", 0777, true);
        }

        move_uploaded_file($tmp_name, "../playlists/$user/" . $name);
        echo "File Successfully Uploaded";
        exit();
    } else {
        echo "File Already Exists";
    }
}
