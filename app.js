const snippets = [];
const snippetList = document.getElementById('snippetList');
const composeList = document.getElementById('composeList');
const presentationMode = document.getElementById('presentationMode');
let currentIndex = 0;

// Add Snippet
document.getElementById('addSnippet').addEventListener('click', () => {
  const text = prompt('Enter your snippet:');
  const type = prompt('Enter type (e.g., Story, Idea, Note):');
  if (text && type) {
    snippets.push({ text, type });
    renderSnippets();
  }
});

function renderSnippets() {
  snippetList.innerHTML = '';
  snippets.forEach((snippet, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${snippet.type}:</strong> ${snippet.text}`;
    li.dataset.index = index;
    snippetList.appendChild(li);
  });
}

// Compose Mode
snippetList.addEventListener('click', (e) => {
  const index = e.target.closest('li').dataset.index;
  composeList.innerHTML += `<li>${snippets[index].text}</li>`;
});

// Present Mode
document.getElementById('startPresentMode').addEventListener('click', () => {
  if (composeList.children.length === 0) {
    alert('Add snippets to compose first.');
    return;
  }
  currentIndex = 0;
  showSnippet();
  presentationMode.classList.remove('hidden');
});

function showSnippet() {
  const snippet = composeList.children[currentIndex];
  document.getElementById('snippetDisplay').textContent = snippet.textContent;
  document.getElementById('progressIndicator').textContent = `${currentIndex + 1}/${composeList.children.length}`;
}

document.getElementById('nextSnippet').addEventListener('click', () => {
  if (currentIndex < composeList.children.length - 1) currentIndex++;
  showSnippet();
});

document.getElementById('prevSnippet').addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  showSnippet();
});

document.getElementById('toggleDetails').addEventListener('click', () => {
  document.getElementById('detailsDisplay').classList.toggle('hidden');
});

document.getElementById('exitPresentMode').addEventListener('click', () => {
  presentationMode.classList.add('hidden');
});
