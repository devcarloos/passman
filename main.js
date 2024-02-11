$(document).ready(function () {
    var passwords = [];
    var debug = false;

    $("#create-button").click(function () {
        debugLog("Create Database button clicked");
        $("#buttons-container").hide();
        $("#content-container").show();
        renderPasswords();
    });

    $("#load-button").click(function () {
        debugLog("Load Database button clicked");
        var fileInput = $("<input>").attr({
            type: "file",
            accept: ".json",
        }).css("display", "none");

        fileInput.change(function (event) {
            var file = event.target.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                debugLog("File loaded for import");
                var fileContent = e.target.result;
                var masterPassword = prompt("Enter your master password:");
                debugLog("Master password entered");

                if (masterPassword !== null) {
                    try {
                        var decryptedContent = decrypt(fileContent, masterPassword);

                        if (decryptedContent !== null) {
                            passwords = JSON.parse(decryptedContent);
                            $("#buttons-container").hide();
                            $("#content-container").show();
                            renderPasswords();
                        } else {
                            alert("Incorrect master password!");
                        }
                    } catch (error) {
                        alert("Error decrypting the file!");
                    }
                }
            };

            reader.readAsText(file);
        });

        fileInput.click();
    });

    $("#debug-button").click(function () {
        debug = !debug;
        $("#debug-button").text(`Debug: ${debug ? "On" : "Off"}`);
        debugLog(`Debug mode: ${debug ? "On" : "Off"}`);
    });

    function renderPasswords() {
        debugLog("Rendering passwords");
        var contentContainer = $("#content-container");
        contentContainer.html("");

        $.each(passwords, function (index, password) {
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

            copyButton.click(function () {
                copyToClipboard(password.password);
            });

            var editButton = $("<button>").text("Edit");
            var removeButton = $("<button>").text("Remove");

            editButton.click(function () {
                var newName = prompt("Enter new name:");
                var newPassword = prompt("Enter new password:");

                if (newName !== null && newPassword !== null) {
                    passwords[index] = {
                        name: newName,
                        password: newPassword
                    };
                    renderPasswords();
                }
            });

            removeButton.click(function () {
                var confirmRemove = confirm("Are you sure you want to remove this password?");

                if (confirmRemove) {
                    passwords.splice(index, 1);
                    renderPasswords();
                }
            });

            passwordBox.append(nameInput, passwordInput, copyButton, editButton, removeButton);
            passwordEntry.append(passwordBox);
            contentContainer.append(passwordEntry);
        });

        var addButton = $("<button>").attr("id", "add-button").text("Add");
        var exportButton = $("<button>").attr("id", "export-button").text("Export");

        addButton.click(function () {
            var name = prompt("Enter name:");
            var password = prompt("Enter password:");

            if (name !== null && password !== null) {
                passwords.push({
                    name: name,
                    password: password
                });
                renderPasswords();
            }
        });

        exportButton.click(function () {
            var masterPassword = prompt("Enter your master password:");

            if (masterPassword !== null) {
                var encryptedContent = encrypt(JSON.stringify(passwords), masterPassword);
                download(encryptedContent, "passwords.json", "application/json");
            }
        });

        contentContainer.append(addButton, exportButton);

        if (passwords.length > 3) {
            contentContainer.addClass("more-than-three-passwords");
        } else {
            contentContainer.removeClass("more-than-three-passwords");
        }
    }

    function copyToClipboard(text) {
        var tempInput = $("<input>").val(text).appendTo("body").select();
        document.execCommand("copy");
        tempInput.remove();
        debugLog("Password copied to clipboard");
        alert("Password copied to clipboard!");
    }

    function debugLog(message) {
        if (debug) {
            console.log(message);
        }
    }

    function encrypt(content, password) {
        debugLog("Encrypting content");
        var encryptedContent = CryptoJS.AES.encrypt(content, password).toString();
        return encryptedContent;
    }

    function decrypt(content, password) {
        debugLog("Decrypting content");
        try {
            var decryptedContent = CryptoJS.AES.decrypt(content, password).toString(CryptoJS.enc.Utf8);
            return decryptedContent;
        } catch (error) {
            return null;
        }
    }

    function download(content, fileName, contentType) {
        debugLog("Downloading file");
        var a = $("<a>").attr({
            href: "data:" + contentType + ";charset=utf-8," + encodeURIComponent(content),
            download: fileName,
        }).appendTo("body");
        a[0].click();
        a.remove();
    }
});
