# Passman

A simple password manager created in HTML, CSS, and pure JavaScript.

[![GitHub issues](https://img.shields.io/github/issues/carloooosdev/passman)](https://github.com/carloooosdev/passman/issues)
[![GitHub stars](https://img.shields.io/github/stars/carloooosdev/passman)](https://github.com/carloooosdev/passman/stargazers)

## Features

- Create and save a password database
- Load an existing database
- View, add, and export passwords

## How to Use

1. Click on the "Create Database" button to create a new password database
2. Click on the "Load Database" button to load an existing database in JSON format
3. Use the "Add" button to add new passwords to the database
4. Use the "Export" button to export the password database in encrypted JSON format

## Code Snippets

### Rendering Passwords

```javascript
function renderPasswords() {
    var contentContainer = $("#content-container");
    contentContainer.html("");

    $.each(passwords, function(index, password) {
        var passwordEntry = $("<div>").addClass("password-entry");

        var passwordBox = $("<div>").addClass("password-box");

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

        var copyButton = $("<button>").text("Copy");

        copyButton.click(function() {
            copyToClipboard(password.password);
        });

        passwordBox.append(nameInput, passwordInput, copyButton);
        passwordEntry.append(passwordBox);
        contentContainer.append(passwordEntry);
    });

    // Add and export buttons
}
```

The `renderPasswords` function iterates through the `passwords` array and dynamically creates HTML elements to display each password entry. It creates input fields for the password name and password itself, along with a "Copy" button that allows users to copy the password to the clipboard.

### Encrypting Content

```javascript
function encrypt(content, password) {
    var encryptedContent = CryptoJS.AES.encrypt(content, password).toString();
    return encryptedContent;
}
```

The `encrypt` function uses the CryptoJS library to encrypt content using the AES encryption algorithm with a given password. It then returns the encrypted content as a string.

### Decrypting Content

```javascript
function decrypt(content, password) {
    try {
        var decryptedContent = CryptoJS.AES.decrypt(content, password).toString(CryptoJS.enc.Utf8);
        return decryptedContent;
    } catch (error) {
        return null;
    }
}
```

The `decrypt` function decrypts the encrypted content using the provided password. It catches any errors that may occur during the decryption process and returns `null` if decryption fails.

## Contact

For any questions or suggestions, please contact me at carlos.henrique.de.paula.oliveira@outlook.com.br.
