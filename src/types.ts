export interface Card {
  /** Stable, unique identity used as the list key. */
  id: number
  emoji: string
  /** Whether the card is currently flipped face up. */
  faceUp: boolean
  /** Matched and playing the enlarge/fade-out animation. */
  matched: boolean
  /** Faded out and no longer in play (keeps its grid cell). */
  removed: boolean
  /**
   * Temporarily revealed by a peek power. Distinct from `faceUp`: a peeking card
   * shows its face but is not a selection, can't match, and can't be clicked.
   */
  peeking: boolean
}

export interface LevelSize {
  cols: number
  rows: number
}

/** The four emoji families a peek power can reveal. */
export type EmojiCategory = 'animals' | 'monsters' | 'instruments' | 'humans'

/**
 * A power is either kept across levels (`reusable`) or spent for good once used
 * (`consumable`). Either way it can only be used once per level.
 */
export type PowerKind = 'reusable' | 'consumable'

export interface PowerDef {
  id: string
  name: string
  icon: string
  /** Short description shown on the shop card. */
  description: string
  /** Coin cost to buy the power in the shop. */
  price: number
  kind: PowerKind
  /** Set on peek powers: the emoji family they reveal. */
  category?: EmojiCategory
}

/** A power as held in the player's inventory for the current session. */
export interface PowerState {
  def: PowerDef
  /** True once the power has been used in the current level (disables it). */
  usedThisLevel: boolean
}
