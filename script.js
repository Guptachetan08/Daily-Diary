// Retrieve diary entries from JSON file
fetch('entries.json')
  .then(response => response.json())
  .then(data => displayEntries(data));

// Add event listener to diary form
document.getElementById('diary-form').addEventListener('submit', saveEntry);

// Save diary entry to JSON file
function saveEntry(e) {
  e.preventDefault();
  // Get form values
  let date = document.getElementById('date').value;
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;

  // Create new entry object
  let entry = {
    date: date,
    title: title,
    content: content
  };

  // Retrieve existing entries from JSON file
  fetch('entries.json')
    .then(response => response.json())
    .then(data => {
      // Add new entry to array of entries
      data.push(entry);
      // Save updated entries to JSON file
      saveEntries(data);
      // Clear form inputs
      document.getElementById('date').value = '';
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      // Update diary entries displayed on page
      displayEntries(data);
    });
}

// Save entries to JSON file
function saveEntries(entries) {
  fetch('entries.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entries)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// Display diary entries on page
function displayEntries(entries) {
  let diaryEntries = document.getElementById('diary-entries');
  diaryEntries.innerHTML = '';
  entries.forEach(entry => {
    let entryHTML = `
      <div class="diary-entry">
        <h2>${entry.title}</h2>
        <h5><b>${entry.date}</b></h5>
        <p style="color: rgb(109, 8, 94);">${entry.content}</p>
      </div>
    `;
    diaryEntries.innerHTML += entryHTML;
  });
}
