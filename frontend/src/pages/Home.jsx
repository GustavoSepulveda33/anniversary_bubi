import { useState } from 'react'
import VideoPanel from '../components/VideoPanel.jsx'
import PanelOption from '../components/PanelOption.jsx'
import AnswerOverlay from '../components/AnswerOverlay.jsx'
import musicBar from '../components/musicBar.jsx'
import { panels } from '../data/panels.js'

function Home() {
  const [activePanelId, setActivePanelId] = useState(null)
  const activePanel = panels.find((panel) => panel.id === activePanelId)

  return (
    <main className="home">
      <section>
        <musicBar></musicBar>
      </section>
      {panels.map((panel, index) => (
        <VideoPanel
          key={panel.id}
          src={panel.src}
          eager={index === 0}
        >
          <PanelOption onOpen={() => setActivePanelId(panel.id)}>
            {panel.title}
          </PanelOption>
        </VideoPanel>
      ))}
      {activePanel ? (
        <AnswerOverlay
          panel={activePanel}
          onClose={() => setActivePanelId(null)}
        />
      ) : null}
    </main>
  )
}

export default Home
