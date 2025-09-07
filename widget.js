async function convertToHebrew(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const response = await fetch(`https://www.hebcal.com/converter?cfg=json&gy=${year}&gm=${month}&gd=${day}&g2h=1`);
    const data = await response.json();
    return `${data.hm} ${data.hd}, ${data.hy}`;
}

document.getElementById("convert").addEventListener("click", async () => {
    const dateStr = document.getElementById("gregorian").value;
    if (!dateStr) return;
    const hebDate = await convertToHebrew(dateStr);
    document.getElementById("output").innerText = hebDate;
});
