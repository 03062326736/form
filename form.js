
     // ======================================================
// SELECT FORM
// ======================================================

const form = document.querySelector("#personalForm");


// ======================================================
// SELECT INPUTS
// ======================================================

const fullName =
    document.querySelector("#fullName");

const fatherName =
    document.querySelector("#fatherName");

const email =
    document.querySelector("#email");

const phone =
    document.querySelector("#phone");

const dob =
    document.querySelector("#dob");

const city =
    document.querySelector("#city");

const qualification =
    document.querySelector("#qualification");

const address =
    document.querySelector("#address");

const about =
    document.querySelector("#about");

const profile =
    document.querySelector("#profile");


// ======================================================
// SELECT RESULT ELEMENTS
// ======================================================

const successMessage =
    document.querySelector("#successMessage");

const resultCard =
    document.querySelector("#resultCard");

const resultContent =
    document.querySelector("#resultContent");


// ======================================================
// SELECT USERS SECTION ELEMENTS
// ======================================================

const searchUser =
    document.querySelector("#searchUser");

const usersContainer =
    document.querySelector("#usersContainer");

const noUsersMessage =
    document.querySelector("#noUsersMessage");

const totalUsers =
    document.querySelector("#totalUsers");


// ======================================================
// USERS ARRAY
// ======================================================

// Browser refresh ke baad bhi users rahenge

let users =
    JSON.parse(localStorage.getItem("users")) || [];


// ======================================================
// SAVE USERS
// ======================================================

function saveUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


// ======================================================
// SUBMIT EVENT
// ======================================================

form.addEventListener("submit", function (event) {

    // Page refresh stop
    event.preventDefault();


    // Previous errors clear
    clearErrors();


    let isValid = true;


    // ==================================================
    // FULL NAME VALIDATION
    // ==================================================

    if (fullName.value.trim() === "") {

        showError(
            fullName,
            "fullNameError",
            "Please enter your full name."
        );

        isValid = false;

    }


    // ==================================================
    // FATHER NAME VALIDATION
    // ==================================================

    if (fatherName.value.trim() === "") {

        showError(
            fatherName,
            "fatherNameError",
            "Please enter father name."
        );

        isValid = false;

    }


    // ==================================================
    // EMAIL VALIDATION
    // ==================================================

    if (email.value.trim() === "") {

        showError(
            email,
            "emailError",
            "Please enter your email."
        );

        isValid = false;

    }

    else if (
        !isValidEmail(email.value.trim())
    ) {

        showError(
            email,
            "emailError",
            "Please enter a valid email."
        );

        isValid = false;

    }


    // ==================================================
    // PHONE VALIDATION
    // ==================================================

    if (phone.value.trim() === "") {

        showError(
            phone,
            "phoneError",
            "Please enter your phone number."
        );

        isValid = false;

    }


    // ==================================================
    // DATE OF BIRTH VALIDATION
    // ==================================================

    if (dob.value === "") {

        showError(
            dob,
            "dobError",
            "Please select your date of birth."
        );

        isValid = false;

    }


    // ==================================================
    // CITY VALIDATION
    // ==================================================

    if (city.value === "") {

        showError(
            city,
            "cityError",
            "Please select your city."
        );

        isValid = false;

    }


    // ==================================================
    // GENDER VALIDATION
    // ==================================================

    const selectedGender =
        document.querySelector(
            'input[name="gender"]:checked'
        );


    if (!selectedGender) {

        document.querySelector(
            "#genderError"
        ).textContent =
            "Please select your gender.";

        isValid = false;

    }


    // ==================================================
    // SKILLS VALIDATION
    // ==================================================

    const selectedSkills =
        document.querySelectorAll(
            'input[name="skills"]:checked'
        );


    if (selectedSkills.length === 0) {

        document.querySelector(
            "#skillsError"
        ).textContent =
            "Please select at least one skill.";

        isValid = false;

    }


    // ==================================================
    // QUALIFICATION VALIDATION
    // ==================================================

    if (qualification.value === "") {

        showError(
            qualification,
            "qualificationError",
            "Please select your qualification."
        );

        isValid = false;

    }


    // ==================================================
    // ADDRESS VALIDATION
    // ==================================================

    if (address.value.trim() === "") {

        showError(
            address,
            "addressError",
            "Please enter your address."
        );

        isValid = false;

    }


    // ==================================================
    // ABOUT VALIDATION
    // ==================================================

    if (about.value.trim() === "") {

        showError(
            about,
            "aboutError",
            "Please write something about yourself."
        );

        isValid = false;

    }


    // ==================================================
    // STOP IF FORM INVALID
    // ==================================================

    if (!isValid) {

        alert("Please fill the form.");

        return;

    }


    // ==================================================
    // CREATE SKILLS ARRAY
    // ==================================================

    let skills = [];


    selectedSkills.forEach(function (skill) {

        skills.push(skill.value);

    });


    // ==================================================
    // PROFILE IMAGE
    // ==================================================

    let profileImage = "";


    /*
        FileReader use kar rahe hain taake image
        localStorage mein bhi save ho sake.
    */

    if (profile.files.length > 0) {

        const file =
            profile.files[0];

        const reader =
            new FileReader();


        reader.onload = function (event) {

            profileImage =
                event.target.result;


            createAndSaveUser(
                skills,
                selectedGender.value,
                profileImage
            );

        };


        reader.readAsDataURL(file);

    }

    else {

        createAndSaveUser(
            skills,
            selectedGender.value,
            ""
        );

    }

});


// ======================================================
// CREATE AND SAVE USER
// ======================================================

function createAndSaveUser(
    skills,
    gender,
    profileImage
) {


    // ==================================================
    // CREATE USER OBJECT
    // ==================================================

    const userData = {

        id: Date.now(),

        /*
            User 1
            User 2
            User 3
            etc.
        */

        userNumber:
            users.length + 1,

        fullName:
            fullName.value.trim(),

        fatherName:
            fatherName.value.trim(),

        email:
            email.value.trim(),

        phone:
            phone.value.trim(),

        dob:
            dob.value,

        gender:
            gender,

        city:
            city.value,

        skills:
            skills,

        qualification:
            qualification.value,

        address:
            address.value.trim(),

        about:
            about.value.trim(),

        profileImage:
            profileImage

    };


    // ==================================================
    // ADD USER TO ARRAY
    // ==================================================

    users.push(userData);


    // ==================================================
    // SAVE ARRAY TO LOCAL STORAGE
    // ==================================================

    saveUsers();


    // ==================================================
    // CONSOLE CHECK
    // ==================================================

    console.log(
        "All Users:",
        users
    );


    // ==================================================
    // SUCCESS ALERT
    // ==================================================

    alert(
        "Form successfully submitted!"
    );


    // ==================================================
    // SHOW LATEST USER
    // ==================================================

    showUserDetails(userData);


    // ==================================================
    // SHOW ALL USER CARDS
    // ==================================================

    displayUsers();


    // ==================================================
    // CLEAR FORM
    // ==================================================

    form.reset();

    clearErrors();


    successMessage.textContent =
        "Form submitted successfully!";


    // ==================================================
    // SCROLL TO RESULT
    // ==================================================

    resultCard.scrollIntoView({

        behavior: "smooth"

    });

}


// ======================================================
// SHOW COMPLETE USER DETAILS
// ======================================================

function showUserDetails(user) {

    resultCard.classList.remove(
        "hidden"
    );


    // ==================================================
    // PROFILE IMAGE
    // ==================================================

    let imageHTML = "";


    if (user.profileImage) {

        imageHTML = `

            <div class="flex justify-center mb-6">

                <img
                    src="${user.profileImage}"
                    alt="Profile Picture"
                    class="w-32 h-32 object-cover rounded-full border-4 border-indigo-100 shadow">

            </div>

        `;

    }


    // ==================================================
    // SHOW DATA
    // ==================================================

    resultContent.innerHTML = `

        ${imageHTML}


        <div class="text-center mb-6">

            <h2 class="text-2xl font-bold text-indigo-600">

                User ${user.userNumber}

            </h2>

            <p class="text-slate-500 mt-1">

                Complete Information

            </p>

        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">


            ${createInfoBox(
                "Full Name",
                user.fullName
            )}


            ${createInfoBox(
                "Father Name",
                user.fatherName
            )}


            ${createInfoBox(
                "Email",
                user.email
            )}


            ${createInfoBox(
                "Phone",
                user.phone
            )}


            ${createInfoBox(
                "Date of Birth",
                user.dob
            )}


            ${createInfoBox(
                "Gender",
                user.gender
            )}


            ${createInfoBox(
                "City",
                user.city
            )}


            ${createInfoBox(
                "Skills",
                user.skills.join(", ")
            )}


            ${createInfoBox(
                "Qualification",
                user.qualification
            )}

        </div>


        <div class="mt-4">

            ${createInfoBox(
                "Address",
                user.address
            )}

        </div>


        <div class="mt-4">

            ${createInfoBox(
                "About",
                user.about
            )}

        </div>

    `;

}


// ======================================================
// CREATE INFORMATION BOX
// ======================================================

function createInfoBox(
    label,
    value
) {

    return `

        <div
            class="bg-slate-50 border border-slate-200 rounded-lg p-4">

            <p
                class="text-xs font-semibold text-slate-500 uppercase">

                ${label}

            </p>

            <p
                class="text-slate-800 font-medium mt-1 break-words">

                ${value || "Not available"}

            </p>

        </div>

    `;

}


// ======================================================
// DISPLAY ALL USERS
// ======================================================

function displayUsers(
    searchText = ""
) {


    // ==================================================
    // CLEAR OLD CARDS
    // ==================================================

    usersContainer.innerHTML = "";


    // ==================================================
    // SEARCH TEXT
    // ==================================================

    const search =
        searchText
            .toLowerCase()
            .trim();


    // ==================================================
    // FILTER USERS
    // ==================================================

    const filteredUsers =
        users.filter(function (user) {


            /*
                User ke tamam data ko ek string mein
                convert kar rahe hain.

                Is wajah se name ke ilawa:
                email
                phone
                city
                skills
                qualification
                address
                about

                sab se search ho sakti hai.
            */

            const searchableData = `

                ${user.fullName}

                ${user.fatherName}

                ${user.email}

                ${user.phone}

                ${user.dob}

                ${user.gender}

                ${user.city}

                ${user.skills.join(" ")}

                ${user.qualification}

                ${user.address}

                ${user.about}

            `.toLowerCase();


            return searchableData.includes(
                search
            );

        });


    // ==================================================
    // UPDATE TOTAL USERS
    // ==================================================

    totalUsers.textContent =
        `Users: ${filteredUsers.length}`;


    // ==================================================
    // NO USER FOUND
    // ==================================================

    if (
        filteredUsers.length === 0
    ) {

        noUsersMessage.classList.remove(
            "hidden"
        );

        return;

    }


    noUsersMessage.classList.add(
        "hidden"
    );


    // ==================================================
    // CREATE USER CARDS
    // ==================================================

    filteredUsers.forEach(
        function (user) {


            const card =
                document.createElement(
                    "div"
                );


            card.className = `

                border
                border-slate-200
                rounded-xl
                p-5
                bg-slate-50
                hover:shadow-lg
                transition

            `;


            // ==================================================
            // PROFILE IMAGE
            // ==================================================

            let imageHTML = "";


            if (user.profileImage) {

                imageHTML = `

                    <img
                        src="${user.profileImage}"
                        alt="Profile"
                        class="w-16 h-16 rounded-full object-cover border-2 border-indigo-200">

                `;

            }

            else {

                imageHTML = `

                    <div
                        class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">

                        ${user.fullName
                            .charAt(0)
                            .toUpperCase()}

                    </div>

                `;

            }


            // ==================================================
            // CARD HTML
            // ==================================================

            card.innerHTML = `

                <div
                    class="flex items-center gap-4 mb-4">


                    ${imageHTML}


                    <div>

                        <h3
                            class="font-bold text-lg text-slate-800">

                            User ${user.userNumber}

                        </h3>


                        <p
                            class="text-indigo-600 font-semibold">

                            ${user.fullName}

                        </p>

                    </div>

                </div>


                <div
                    class="space-y-2 text-sm">


                    <p>

                        <span class="font-semibold">
                            City:
                        </span>

                        ${user.city}

                    </p>


                    <p>

                        <span class="font-semibold">
                            Email:
                        </span>

                        ${user.email}

                    </p>


                    <p>

                        <span class="font-semibold">
                            Qualification:
                        </span>

                        ${user.qualification}

                    </p>


                    <p>

                        <span class="font-semibold">
                            Skills:
                        </span>

                        ${user.skills.join(", ")}

                    </p>

                </div>


                <!-- VIEW COMPLETE FORM BUTTON -->

                <button
                    type="button"
                    class="view-user-btn mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition">

                    View Complete Form

                </button>

            `;


            // ==================================================
            // VIEW BUTTON
            // ==================================================

            const viewButton =
                card.querySelector(
                    ".view-user-btn"
                );


            viewButton.addEventListener(
                "click",
                function () {


                    // Complete user data show

                    showUserDetails(
                        user
                    );


                    // Result tak scroll

                    resultCard.scrollIntoView({

                        behavior: "smooth"

                    });

                }
            );


            // ==================================================
            // ADD CARD TO CONTAINER
            // ==================================================

            usersContainer.appendChild(
                card
            );

        }
    );

}


// ======================================================
// SEARCH EVENT
// ======================================================

searchUser.addEventListener(
    "input",
    function () {

        displayUsers(
            this.value
        );

    }
);


// ======================================================
// RESET EVENT
// ======================================================

form.addEventListener(
    "reset",
    function () {


        setTimeout(
            function () {

                clearErrors();

                successMessage.textContent = "";

            },
            0
        );

    }
);


// ======================================================
// SHOW ERROR FUNCTION
// ======================================================

function showError(
    input,
    errorId,
    message
) {


    // Red border

    input.classList.add(
        "border-red-500"
    );


    // Find error element

    const errorElement =
        document.querySelector(
            "#" + errorId
        );


    // Show error message

    if (errorElement) {

        errorElement.textContent =
            message;

    }

}


// ======================================================
// CLEAR ERRORS FUNCTION
// ======================================================

function clearErrors() {


    // ==================================================
    // REMOVE RED BORDER
    // ==================================================

    const inputs =
        form.querySelectorAll(
            "input, select, textarea"
        );


    inputs.forEach(
        function (input) {

            input.classList.remove(
                "border-red-500"
            );

        }
    );


    // ==================================================
    // CLEAR ERROR TEXT
    // ==================================================

    const errors =
        form.querySelectorAll(
            "p[id$='Error']"
        );


    errors.forEach(
        function (error) {

            error.textContent = "";

        }
    );

}


// ======================================================
// EMAIL VALIDATION FUNCTION
// ======================================================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


// ======================================================
// INITIAL DISPLAY
// ======================================================

displayUsers();