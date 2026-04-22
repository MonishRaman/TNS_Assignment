const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

async function request(path, options = {}, expectText = false) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Request failed with status ${response.status}`)
  }

  if (expectText) {
    return response.text()
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload) {
  return request(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    true,
  )
}

export function getAllStudents() {
  return request('/students')
}

export function addStudent(payload) {
  return request('/students', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteStudent(id) {
  return request(`/students/${id}`, { method: 'DELETE' }, true)
}

export function searchStudentByHallTicket(hallTicket) {
  return request(`/students/hall/${hallTicket}`)
}

export function searchStudentsByName(name) {
  return request(`/students/name/${encodeURIComponent(name)}`)
}

export function getAllColleges() {
  return request('/colleges')
}

export function addCollege(payload) {
  return request('/colleges', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteCollege(id) {
  return request(`/colleges/${id}`, { method: 'DELETE' }, true)
}

export function getAllPlacements() {
  return request('/placements')
}

export function getPlacementsByYear(year) {
  return request(`/placements/year/${year}`)
}

export function addPlacement(payload) {
  return request('/placements', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deletePlacement(id) {
  return request(`/placements/${id}`, { method: 'DELETE' }, true)
}

export function getAllCertificates() {
  return request('/certificates')
}

export function addCertificate(payload) {
  return request('/certificates', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteCertificate(id) {
  return request(`/certificates/${id}`, { method: 'DELETE' }, true)
}
