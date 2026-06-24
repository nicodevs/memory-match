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
}

export interface LevelSize {
  cols: number
  rows: number
}
