import { useEffect, useMemo, useState } from 'react'
import {
  addCertificate,
  addCollege,
  addPlacement,
  addStudent,
  deleteCertificate,
  deleteCollege,
  deletePlacement,
  deleteStudent,
  getAllCertificates,
  getAllColleges,
  getAllPlacements,
  getAllStudents,
  getPlacementsByYear,
  loginUser,
  registerUser,
  searchStudentByHallTicket,
  searchStudentsByName,
} from './api'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [colleges, setColleges] = useState([])
  const [placements, setPlacements] = useState([])
  const [certificates, setCertificates] = useState([])
  const [activeTab, setActiveTab] = useState('students')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const [registerForm, setRegisterForm] = useState({
    name: '',
    password: '',
    type: '',
  })
  const [loginForm, setLoginForm] = useState({
    name: '',
    password: '',
  })

  const [studentForm, setStudentForm] = useState({
    name: '',
    qualification: '',
    course: '',
    year: '',
    hallTicketNo: '',
  })
  const [studentSearch, setStudentSearch] = useState({
    hallTicket: '',
    name: '',
  })
  const [studentSearchResults, setStudentSearchResults] = useState([])

  const [collegeForm, setCollegeForm] = useState({
    collegeName: '',
    location: '',
  })

  const [placementForm, setPlacementForm] = useState({
    name: '',
    qualification: '',
    year: '',
  })
  const [placementFilterYear, setPlacementFilterYear] = useState('')
  const [placementFilterResults, setPlacementFilterResults] = useState([])

  const [certificateForm, setCertificateForm] = useState({
    year: '',
    studentId: '',
    fileName: '',
  })

  const tabs = useMemo(
    () => [
      { id: 'students', label: 'Students' },
      { id: 'colleges', label: 'Colleges' },
      { id: 'placements', label: 'Placements' },
      { id: 'certificates', label: 'Certificates' },
      { id: 'auth', label: 'Auth' },
    ],
    [],
  )

  const runAction = async (action, successText) => {
    setLoading(true)
    setStatus('')
    try {
      await action()
      setStatus(successText)
    } catch (error) {
      setStatus(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const loadStudents = async () => {
    const data = await getAllStudents()
    setStudents(data)
  }

  const loadColleges = async () => {
    const data = await getAllColleges()
    setColleges(data)
  }

  const loadPlacements = async () => {
    const data = await getAllPlacements()
    setPlacements(data)
  }

  const loadCertificates = async () => {
    const data = await getAllCertificates()
    setCertificates(data)
  }

  const loadDashboard = async () => {
    setLoading(true)
    setStatus('Loading data...')
    try {
      await Promise.all([
        loadStudents(),
        loadColleges(),
        loadPlacements(),
        loadCertificates(),
      ])
      setStatus('Data loaded')
    } catch (error) {
      setStatus(error.message || 'Unable to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const handleRegister = async (event) => {
    event.preventDefault()
    await runAction(async () => {
      await registerUser(registerForm)
      setRegisterForm({ name: '', password: '', type: '' })
    }, 'User registered successfully')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const message = await loginUser(loginForm)
      setStatus(`Login response: ${message}`)
    } catch (error) {
      setStatus(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleStudentAdd = async (event) => {
    event.preventDefault()
    await runAction(async () => {
      await addStudent({
        ...studentForm,
        year: Number(studentForm.year),
        hallTicketNo: Number(studentForm.hallTicketNo),
      })
      setStudentForm({
        name: '',
        qualification: '',
        course: '',
        year: '',
        hallTicketNo: '',
      })
      await loadStudents()
    }, 'Student added successfully')
  }

  const handleStudentDelete = async (id) => {
    await runAction(async () => {
      await deleteStudent(id)
      await loadStudents()
    }, 'Student deleted successfully')
  }

  const handleStudentSearch = async () => {
    await runAction(async () => {
      if (studentSearch.hallTicket) {
        const result = await searchStudentByHallTicket(Number(studentSearch.hallTicket))
        setStudentSearchResults(result ? [result] : [])
        return
      }
      if (studentSearch.name.trim()) {
        const result = await searchStudentsByName(studentSearch.name.trim())
        setStudentSearchResults(result)
        return
      }
      setStudentSearchResults([])
    }, 'Student search complete')
  }

  const handleCollegeAdd = async (event) => {
    event.preventDefault()
    await runAction(async () => {
      await addCollege(collegeForm)
      setCollegeForm({ collegeName: '', location: '' })
      await loadColleges()
    }, 'College added successfully')
  }

  const handleCollegeDelete = async (id) => {
    await runAction(async () => {
      await deleteCollege(id)
      await loadColleges()
    }, 'College deleted successfully')
  }

  const handlePlacementAdd = async (event) => {
    event.preventDefault()
    await runAction(async () => {
      await addPlacement({
        ...placementForm,
        year: Number(placementForm.year),
      })
      setPlacementForm({ name: '', qualification: '', year: '' })
      await loadPlacements()
    }, 'Placement added successfully')
  }

  const handlePlacementDelete = async (id) => {
    await runAction(async () => {
      await deletePlacement(id)
      await loadPlacements()
    }, 'Placement deleted successfully')
  }

  const handlePlacementFilter = async () => {
    await runAction(async () => {
      if (!placementFilterYear) {
        setPlacementFilterResults([])
        return
      }
      const result = await getPlacementsByYear(Number(placementFilterYear))
      setPlacementFilterResults(result)
    }, 'Placement filter complete')
  }

  const handleCertificateAdd = async (event) => {
    event.preventDefault()
    await runAction(async () => {
      await addCertificate({
        year: Number(certificateForm.year),
        fileName: certificateForm.fileName,
        student: { id: Number(certificateForm.studentId) },
      })
      setCertificateForm({ year: '', studentId: '', fileName: '' })
      await loadCertificates()
    }, 'Certificate added successfully')
  }

  const handleCertificateDelete = async (id) => {
    await runAction(async () => {
      await deleteCertificate(id)
      await loadCertificates()
    }, 'Certificate deleted successfully')
  }

  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">TNS Assignment</p>
        <h1>Placement Control Room</h1>
        <p className="subtitle">
          React frontend connected to your Spring Boot backend for student,
          college, placement, certificate, and auth workflows.
        </p>
        <button className="refresh" onClick={loadDashboard} disabled={loading}>
          {loading ? 'Working...' : 'Refresh Data'}
        </button>
      </header>

      <section className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </section>

      <section className="status">{status || 'Ready'}</section>

      {activeTab === 'students' && (
        <section className="panel">
          <h2>Students</h2>
          <form className="form-grid" onSubmit={handleStudentAdd}>
            <input
              placeholder="Name"
              value={studentForm.name}
              onChange={(event) =>
                setStudentForm({ ...studentForm, name: event.target.value })
              }
              required
            />
            <input
              placeholder="Qualification"
              value={studentForm.qualification}
              onChange={(event) =>
                setStudentForm({
                  ...studentForm,
                  qualification: event.target.value,
                })
              }
              required
            />
            <input
              placeholder="Course"
              value={studentForm.course}
              onChange={(event) =>
                setStudentForm({ ...studentForm, course: event.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={studentForm.year}
              onChange={(event) =>
                setStudentForm({ ...studentForm, year: event.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Hall Ticket No"
              value={studentForm.hallTicketNo}
              onChange={(event) =>
                setStudentForm({
                  ...studentForm,
                  hallTicketNo: event.target.value,
                })
              }
              required
            />
            <button type="submit" disabled={loading}>
              Add Student
            </button>
          </form>

          <div className="search-row">
            <input
              type="number"
              placeholder="Search by hall ticket"
              value={studentSearch.hallTicket}
              onChange={(event) =>
                setStudentSearch({
                  ...studentSearch,
                  hallTicket: event.target.value,
                })
              }
            />
            <input
              placeholder="Search by exact name"
              value={studentSearch.name}
              onChange={(event) =>
                setStudentSearch({ ...studentSearch, name: event.target.value })
              }
            />
            <button onClick={handleStudentSearch} disabled={loading}>
              Search
            </button>
          </div>

          {studentSearchResults.length > 0 && (
            <div className="result-box">
              <h3>Search Results</h3>
              {studentSearchResults.map((student) => (
                <p key={`search-${student.id}`}>
                  {student.id} | {student.name} | {student.qualification} |
                  {' '}Hall: {student.hallTicketNo}
                </p>
              ))}
            </div>
          )}

          <div className="list">
            {students.map((student) => (
              <article key={student.id} className="card">
                <p>{student.name}</p>
                <small>
                  {student.qualification} | {student.course} | Year {student.year}
                </small>
                <small>Hall Ticket: {student.hallTicketNo}</small>
                <button onClick={() => handleStudentDelete(student.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'colleges' && (
        <section className="panel">
          <h2>Colleges</h2>
          <form className="form-grid" onSubmit={handleCollegeAdd}>
            <input
              placeholder="College Name"
              value={collegeForm.collegeName}
              onChange={(event) =>
                setCollegeForm({ ...collegeForm, collegeName: event.target.value })
              }
              required
            />
            <input
              placeholder="Location"
              value={collegeForm.location}
              onChange={(event) =>
                setCollegeForm({ ...collegeForm, location: event.target.value })
              }
              required
            />
            <button type="submit" disabled={loading}>
              Add College
            </button>
          </form>
          <div className="list">
            {colleges.map((college) => (
              <article key={college.id} className="card">
                <p>{college.collegeName}</p>
                <small>{college.location}</small>
                <button onClick={() => handleCollegeDelete(college.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'placements' && (
        <section className="panel">
          <h2>Placements</h2>
          <form className="form-grid" onSubmit={handlePlacementAdd}>
            <input
              placeholder="Name"
              value={placementForm.name}
              onChange={(event) =>
                setPlacementForm({ ...placementForm, name: event.target.value })
              }
              required
            />
            <input
              placeholder="Qualification"
              value={placementForm.qualification}
              onChange={(event) =>
                setPlacementForm({
                  ...placementForm,
                  qualification: event.target.value,
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Year"
              value={placementForm.year}
              onChange={(event) =>
                setPlacementForm({ ...placementForm, year: event.target.value })
              }
              required
            />
            <button type="submit" disabled={loading}>
              Add Placement
            </button>
          </form>

          <div className="search-row">
            <input
              type="number"
              placeholder="Filter by year"
              value={placementFilterYear}
              onChange={(event) => setPlacementFilterYear(event.target.value)}
            />
            <button onClick={handlePlacementFilter} disabled={loading}>
              Apply Filter
            </button>
          </div>

          {placementFilterResults.length > 0 && (
            <div className="result-box">
              <h3>Year Filter Results</h3>
              {placementFilterResults.map((placement) => (
                <p key={`filter-${placement.id}`}>
                  {placement.id} | {placement.name} | {placement.qualification} |
                  {' '}Year {placement.year}
                </p>
              ))}
            </div>
          )}

          <div className="list">
            {placements.map((placement) => (
              <article key={placement.id} className="card">
                <p>{placement.name}</p>
                <small>
                  {placement.qualification} | Year {placement.year}
                </small>
                <button onClick={() => handlePlacementDelete(placement.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'certificates' && (
        <section className="panel">
          <h2>Certificates</h2>
          <form className="form-grid" onSubmit={handleCertificateAdd}>
            <input
              type="number"
              placeholder="Year"
              value={certificateForm.year}
              onChange={(event) =>
                setCertificateForm({ ...certificateForm, year: event.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Student ID"
              value={certificateForm.studentId}
              onChange={(event) =>
                setCertificateForm({
                  ...certificateForm,
                  studentId: event.target.value,
                })
              }
              required
            />
            <input
              placeholder="Certificate file name"
              value={certificateForm.fileName}
              onChange={(event) =>
                setCertificateForm({
                  ...certificateForm,
                  fileName: event.target.value,
                })
              }
              required
            />
            <button type="submit" disabled={loading}>
              Add Certificate
            </button>
          </form>

          <div className="list">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="card">
                <p>Year {certificate.year}</p>
                <small>
                  Student ID: {certificate.student?.id ?? 'N/A'} | File:
                  {' '}
                  {certificate.fileName}
                </small>
                <button onClick={() => handleCertificateDelete(certificate.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'auth' && (
        <section className="panel auth-grid">
          <div>
            <h2>Register</h2>
            <form className="form-grid" onSubmit={handleRegister}>
              <input
                placeholder="Name"
                value={registerForm.name}
                onChange={(event) =>
                  setRegisterForm({ ...registerForm, name: event.target.value })
                }
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm({
                    ...registerForm,
                    password: event.target.value,
                  })
                }
                required
              />
              <input
                placeholder="Type (admin/user)"
                value={registerForm.type}
                onChange={(event) =>
                  setRegisterForm({ ...registerForm, type: event.target.value })
                }
                required
              />
              <button type="submit" disabled={loading}>
                Register
              </button>
            </form>
          </div>
          <div>
            <h2>Login</h2>
            <form className="form-grid" onSubmit={handleLogin}>
              <input
                placeholder="Name"
                value={loginForm.name}
                onChange={(event) =>
                  setLoginForm({ ...loginForm, name: event.target.value })
                }
                required
              />
              <input
                placeholder="Password"
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm({ ...loginForm, password: event.target.value })
                }
                required
              />
              <button type="submit" disabled={loading}>
                Login
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  )
}

export default App
