import React from 'react'

export function AIPage() {
  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-2">IA d&apos;aide à la décision</h2>
        <p className="text-gray-300 mb-2">
          Cette section accueillera les recommandations générées par l&apos;IA en fonction de ton profil de risque et de tes comptes.
        </p>
        <p className="text-gray-400 text-sm">
          Pour l&apos;instant, tout est mocké côté données. Quand le back sera prêt, on branchera ici les vraies prévisions.
        </p>
      </div>
    </div>
  )
}
