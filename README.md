# Passman

A simple password manager created in HTML, CSS, and pure JavaScript.

[![GitHub issues](https://img.shields.io/github/issues/carloooosdev/passman)](https://github.com/carloooosdev/passman/issues)
[![GitHub stars](https://img.shields.io/github/stars/carloooosdev/passman)](https://github.com/carloooosdev/passman/stargazers)

## Features

- Create and save a password database
- Load an existing database
- View, add, edit, and remove passwords
- Export passwords in encrypted JSON format

## How to Use

1. Click on the "Create Database" button to create a new password database
2. Click on the "Load Database" button to load an existing database in JSON format
3. Use the "Add" button to add new passwords to the database
4. Use the "Export" button to export the password database in encrypted JSON format

## Code Snippets

### Rendering Passwords

```javascript
function renderPasswords() {
    // Function to render password entries in the content container
    var contentContainer = $("#content-container");
    contentContainer.html("");

    // Loop through each password entry in the passwords array
    $.each(passwords, function(index, password) {
        // Create HTML elements for each password entry
        var passwordEntry = $("<div>").addClass("password-entry");
        var passwordBox = $("<div>").addClass("password-box");

        // Input fields for password name and password
        var nameInput = $("<input>").attr({
            type: "text",
            value: password.name,
            readonly: true,
        });

        var passwordInput = $("<input>").attr({
            type: "password",
            value: password.password,
            readonly: true,
        });

        // Copy, edit, and remove buttons for each password entry
        var copyButton = $("<button>").text("Copy");
        copyButton.click(function() {
            copyToClipboard(password.password);
        });

        var editButton = $("<button>").text("Edit");
        editButton.click(function() {
            // Functionality for editing password name and password
        });

        var removeButton = $("<button>").text("Remove");
        removeButton.click(function() {
            // Functionality for removing the password entry
        });

        // Append elements to the password box and entry
        passwordBox.append(nameInput, passwordInput, copyButton, editButton, removeButton);
        passwordEntry.append(passwordBox);
        contentContainer.append(passwordEntry);
    });

    // Add and export buttons
}
```

The `renderPasswords` function dynamically generates HTML elements for each password entry, providing options to copy, edit, and remove passwords. Users can interact with the password entries to manage their data effectively.

### Encrypting Content

```javascript
function encrypt(content, password) {
    // Function to encrypt content using the given password
    var encryptedContent = CryptoJS.AES.encrypt(content, password).toString();
    return encryptedContent;
}
```

The `encrypt` function utilizes the AES encryption algorithm from CryptoJS to encrypt content with a specified password. This ensures that sensitive data is securely stored and accessed only with the correct password.

### Decrypting Content

```javascript
function decrypt(content, password) {
    // Function to decrypt encrypted content using the provided password
    try {
        var decryptedContent = CryptoJS.AES.decrypt(content, password).toString(CryptoJS.enc.Utf8);
        return decryptedContent;
    } catch (error) {
        return null;
    }
}
```

The `decrypt` function is crucial for decrypting encrypted content with the correct password. It handles decryption errors to prevent data loss or corruption, ensuring that users can securely access their stored passwords.

## Contact

For any questions or suggestions, please contact me at carlos.henrique.de.paula.oliveira@outlook.com.br.
