const Programs = () => {
  const programs = [
    {
      title: "AI Morning Show",
      description: "Start your day with AI-curated news, weather, and upbeat music.",
      time: "Mon-Fri 6-9 AM",
      listeners: "2.1k listeners",
      icon: "🌅",
    },
    {
      title: "Deep Dive Fridays",
      description: "Weekly deep dives into AI ethics, technology insights with in-person interviews.",
      time: "Fridays 8-10 PM",
      listeners: "1.8k listeners",
      icon: "⭐",
    },
    {
      title: "Interactive Sessions",
      description: "Real-time listener requests and AI-community conferences.",
      time: "Saturdays 7-9 PM",
      listeners: "3.2k listeners",
      icon: "▶️",
    },
  ]

  return (
    <section className="programs-section">
      <div className="programs-container">
        <h2 className="programs-title">Programs Coming Soon</h2>

        <div className="programs-grid">
          {programs.map((program, index) => (
            <div key={index} className="program-card">
              <div className="program-header">
                <span className="program-icon">{program.icon}</span>
                <h3 className="program-title">{program.title}</h3>
              </div>

              <p className="program-description">{program.description}</p>

              <div className="program-details">
                <div className="program-detail">
                  <span className="detail-icon">🕒</span>
                  {program.time}
                </div>
                <div className="program-detail">
                  <span className="detail-icon">👥</span>
                  {program.listeners}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
