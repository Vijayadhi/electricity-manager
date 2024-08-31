function calculateBill(previousReading, currentReading) {

    // resultContainer.style.display = 'block';

    // const previousReading = document.getElementById('previousReading').value;
    // const currentReading = document.getElementById('currentReading').value;

    // if (previousReading > currentReading) {
    //     window.alert("Enter valid previous reading")
    // }
    // else {
    //     console.log(previousReading, currentReading);

    let unitsConsumed = currentReading - previousReading;
    let billAmount = 0.0;

    if (unitsConsumed <= 100) {
        billAmount = 0.0;
    } else if (unitsConsumed <= 200) {
        billAmount = (unitsConsumed - 100) * 2.25;
    } else if (unitsConsumed <= 400) {
        billAmount = ((unitsConsumed - 200) * 4.50) + 225;
    } else if (unitsConsumed <= 500) {
        billAmount = ((unitsConsumed - 400) * 6.0) + 1125;
    } else if (unitsConsumed <= 600) {
        billAmount = ((unitsConsumed - 500) * 8.0) + 1950;
    } else if (unitsConsumed <= 800) {
        billAmount = ((unitsConsumed - 600) * 9.0) + 2750;
    } else if (unitsConsumed <= 1000) {
        billAmount = ((unitsConsumed - 800) * 10.0) + 4550;
    } else {
        billAmount = ((unitsConsumed - 800) * 11.0) + 4350;
    }
    return [unitsConsumed, billAmount];
    // const table = document.getElementById('userData');
    // table.innerHTML = ""
    // const newRow = table.insertRow();
    // newRow.innerHTML = `
    //     <td style="border: 2px solid black">${previousReading}</td>
    //     <td style="border: 2px solid black">${currentReading}</td>
    //     <td style="border: 2px solid black">${unitsConsumed}</td>
    //     <td style="border: 2px solid black"><i class="fa-solid fa-ruppee"></i>${billAmount}</td>
    // `;

    // // FormData.clear();
    // let resetprevious = document.getElementById("previousReading");
    // resetprevious.innerText = "hello";

}
// }


// Add this script block at the end of your HTML body



document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("banner");
    banner.style.display = "block";
});

function closeBanner() {
    const banner = document.getElementById("banner");
    banner.style.display = "none";
}

export default calculateBill