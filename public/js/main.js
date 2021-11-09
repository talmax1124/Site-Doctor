// Fetch accessibility issues
const testAccessibility = async (e) => {
  e.preventDefault()

  const url = document.querySelector('#url').value

  if (url === '') {
    alert('Please add a url')
  } else {
    setLoading()

    const response = await fetch(`/api/tester?url=${url}`)

    if (response.status !== 200) {
      setLoading(false)
      alert('Something went wrong')
    } else {
      const { issues } = await response.json()
      addIssuesToDOM(issues)
      setLoading(false)
    }
  }
}
// Addd issues to DOM
const addIssuesToDOM = (issues) => {
  const issuesOutput = document.querySelector('#issues')

  issuesOutput.innerHTML = ''

  if (issues.length === 0) {
    issuesOutput.innerHTML = '<h4>No Issues Found</h4>'
  } else {
    issues.forEach((issue) => {
      const output = `
        <div class="mt-3 mb-3 p-3" style="border: 2px solid black;">
          <div class="text-1xl font-bold font-monospace">
            <h4>Issue: ${issue.message}</h4>

            <p class="bg-gray-100 mb-2 mt-2">
             HTML Element: <code>${escapeHTML(issue.context)}</code>
            </p>

            <p class="text-white bg-black p-1">
              CODE: ${issue.code}
            </p>
          </div>
        </div>
      `

      issuesOutput.innerHTML += output
    })
  }
}

// Set loading state
const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader')
  if (isLoading) {
    loader.style.display = 'block'
  } else {
    loader.style.display = 'none'
  }
}

// Escape HTML
function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

document.querySelector('#form').addEventListener('submit', testAccessibility)
