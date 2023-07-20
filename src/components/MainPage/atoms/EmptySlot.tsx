import React, { useEffect, useState } from 'react'
import * as S from '../../../styles/mainPageStyles'
import { Word } from '../../../types/Word'
import { placeWordToEmptySlot } from '../../../lib/placeWordToEmptySlot'
import { useDragDropStore } from '../../../store/dragDropStore'
import { useWorkplaceStore } from '../../../store/workplaceStore'
import { positionStyle } from '../../../lib/positionStyle'
import { PositionStyles } from '../../../types/PositionStyles'

type Props = {
  emptySlot: Word
  isWorksheet: boolean
  index: number
}

const EmptySlot = ({ emptySlot, isWorksheet, index }: Props) => {
  const [positionStyles, setPositionStyles] = useState<PositionStyles>()

  const { currentWord } = useDragDropStore(({ currentWord }) => ({ currentWord }))

  const { constructorArray, dispatchConstructorArray, worksheetArray, dispatchWorksheetArray } =
    useWorkplaceStore(
      ({ constructorArray, dispatchConstructorArray, worksheetArray, dispatchWorksheetArray }) => ({
        constructorArray,
        dispatchConstructorArray,

        worksheetArray,
        dispatchWorksheetArray
      })
    )

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, emptySlot: Word) => {
    e.preventDefault()
    e.stopPropagation()
    placeWordToEmptySlot(
      currentWord,
      emptySlot,
      constructorArray,
      dispatchConstructorArray,
      worksheetArray,
      dispatchWorksheetArray
    )
  }
  useEffect(() => {
    setPositionStyles(positionStyle(index))
  }, [index])

  return (
    <S.ConstructorEmptySlot
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, emptySlot)}
      $isWorksheet={isWorksheet}
      style={positionStyles}
    />

  )
}

export default EmptySlot
