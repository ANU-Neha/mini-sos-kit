function saveContact() {
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
  
    if (name && phone.length === 10) {
      let contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];
      contacts.push({ name, phone });
      localStorage.setItem("sosContacts", JSON.stringify(contacts));
      document.getElementById("contactName").value = "";
      document.getElementById("contactPhone").value = "";
      showSavedContact();
      alert("✅ Contact saved!");
    } else {
      alert("⚠️ Enter a valid name and 10-digit phone number.");
    }
  }
  
  function showSavedContact() {
    const contactList = document.getElementById("contactList");
    const contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];
  
    if (contacts.length === 0) {
      contactList.innerHTML = "<li>No contacts saved yet.</li>";
      return;
    }
  
    contactList.innerHTML = contacts.map((contact, index) => {
      return `<li>
        <input type="checkbox" id="contact_${index}" data-name="${contact.name}" data-phone="${contact.phone}">
        ${contact.name} - ${contact.phone}
        <a href="tel:${contact.phone}" style="margin-left: 10px;">📞</a>
        <button onclick="deleteContact(${index})" style="margin-left: 10px; font-size: 12px;">❌</button>
      </li>`;
    }).join("");
  }
  
  function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem("sosContacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("sosContacts", JSON.stringify(contacts));
    showSavedContact();
  }
  
  function sendAlert() {
    const checkboxes = document.querySelectorAll("#contactList input[type='checkbox']:checked");
  
    if (checkboxes.length === 0) {
      alert("⚠️ Please select at least one contact.");
      return;
    }
  
    const alerted = [];
  
    checkboxes.forEach((box) => {
      const name = box.dataset.name;
      const phone = box.dataset.phone;
      alerted.push(`${name} (${phone})`);
      // You could extend this with Firebase or Twilio later
    });
  
    document.getElementById("alertAudio").play();
    document.getElementById("output").innerText = `🚨 Alerts sent to:\n${alerted.join("\n")}`;
    alert("🚨 Alert sent to selected contacts!");
  }
  
  function shareLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const link = `https://www.google.com/maps?q=${lat},${lon}`;
        document.getElementById("output").innerHTML = `
          <p>📍 Share this link:</p>
          <a href="${link}" target="_blank">${link}</a>
        `;
      });
    } else {
      alert("❌ Geolocation not supported!");
    }
  }
  
  function makeMissedCalls() {
    const checkboxes = document.querySelectorAll("#contactList input[type='checkbox']:checked");
    if (checkboxes.length === 0) {
      alert("⚠️ Please select at least one contact.");
      return;
    }
    checkboxes.forEach((box) => {
      const phone = box.dataset.phone;
      window.open(`tel:${phone}`);
    });
  }
  function playAlertTune() {
    const audio = document.getElementById("alertAudio");
    audio.play();
  }
  
  function showHelplines() {
    document.getElementById("output").innerHTML = `
      <h3>Important Helplines</h3>
      <ul>
        <li>🔴 Police: 100</li>
        <li>🆘 Women Helpline: 1091</li>
        <li>🚨 Emergency: 112</li>
        <li>🏥 Ambulance: 108</li>
      </ul>
    `;
  }
  
  window.onload = showSavedContact;
  