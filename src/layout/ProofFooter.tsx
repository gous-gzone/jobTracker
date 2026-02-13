import React, { useState } from 'react'
import { Checkbox } from '../components/Checkbox'
import { Input } from '../components/Input'
import './ProofFooter.css'

export interface ProofItem {
  id: string
  label: string
  checked: boolean
  proofInput?: string
}

export interface ProofFooterProps {
  items: ProofItem[]
  onItemChange: (id: string, checked: boolean) => void
  onProofInputChange?: (id: string, value: string) => void
}

export const ProofFooter: React.FC<ProofFooterProps> = ({
  items,
  onItemChange,
  onProofInputChange,
}) => {
  return (
    <div className="proof-footer">
      <div className="proof-footer__content">
        <h3 className="proof-footer__title">Proof Checklist</h3>
        <div className="proof-footer__items">
          {items.map((item) => (
            <div key={item.id} className="proof-footer__item">
              <Checkbox
                label={item.label}
                checked={item.checked}
                onCheckedChange={(checked) => onItemChange(item.id, checked)}
              />
              {item.checked && (
                <Input
                  placeholder="Add proof (screenshot URL, test result, etc.)"
                  value={item.proofInput || ''}
                  onChange={(e) => onProofInputChange?.(item.id, e.target.value)}
                  className="proof-footer__input"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
