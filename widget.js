// ===== Gregorian → Hebrew =====
async function convertToHebrew(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const response = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`);
    const data = await response.json();
    return `${data.hd} ${data.hm}, ${data.hy}`;
}

document.getElementById("convertToHebrew").addEventListener("click", async () => {
    const dateStr = document.getElementById("gregorian").value;
    if (!dateStr) {
        document.getElementById("hebOutput").innerText = "Please select a date.";
        return;
    }
    const hebDate = await convertToHebrew(dateStr);
    document.getElementById("hebOutput").innerText = hebDate;
});

// ===== Hebrew → Gregorian =====
async function convertToGregorian() {
    const hebDateStr = document.getElementById("hebrew").value.trim();
    if (!hebDateStr) return null;

    // Expecting format: "1 Tishrei 5785"
    const [hd, hm, hy] = hebDateStr.split(" ");
    const response = await fetch(`https://www.hebcal.com/converter?cfg=json&hd=${hd}&hm=${hm}&hy=${hy}&h2g=1`);
    const data = await response.json();
    return `${data.gm}/${data.gd}/${data.gy}`;
}

document.getElementById("convertToGregorian").addEventListener("click", async () => {
    const gregDate = await convertToGregorian();
    if (gregDate) {
        document.getElementById("gregOutput").innerText = gregDate;
    } else {
        document.getElementById("gregOutput").innerText = "Please enter a valid Hebrew date.";
    }
});
