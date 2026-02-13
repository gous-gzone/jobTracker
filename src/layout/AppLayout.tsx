import React from 'react'
import { TopBar, TopBarProps } from './TopBar'
import { ContextHeader, ContextHeaderProps } from './ContextHeader'
import { PrimaryWorkspace } from './PrimaryWorkspace'
import { SecondaryPanel, SecondaryPanelProps } from './SecondaryPanel'
import { ProofFooter, ProofFooterProps } from './ProofFooter'
import './AppLayout.css'

export interface AppLayoutProps {
  topBar: TopBarProps
  contextHeader: ContextHeaderProps
  secondaryPanel: SecondaryPanelProps
  proofFooter: ProofFooterProps
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  topBar,
  contextHeader,
  secondaryPanel,
  proofFooter,
  children,
}) => {
  return (
    <div className="app-layout">
      <TopBar {...topBar} />
      <ContextHeader {...contextHeader} />
      <div className="app-layout__main">
        <PrimaryWorkspace>{children}</PrimaryWorkspace>
        <SecondaryPanel {...secondaryPanel} />
      </div>
      <ProofFooter {...proofFooter} />
    </div>
  )
}
