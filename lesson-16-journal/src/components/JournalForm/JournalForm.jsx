import React from "react"
import { useState } from "react"
import { BsCalendarDate, BsJournalText, BsBookmark } from "react-icons/bs"
import { TbMoodCog } from "react-icons/tb"
import styles from "./JournalForm.module.css"

const JournalForm = ({ addItem }) => {
  const [formValidState, setFormValidState] = useState({
    title: true,
    date: true,
    mood: true,
    description: true
  })

  const addJournalItem = (e) => {
    let isFormValid = true
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)

    // к undefined мы не можем применить trim(), поэтому используем запись: formProps.title?
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }))
      isFormValid = false
    } else {
      setFormValidState((state) => ({ ...state, title: true }))
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }))
      isFormValid = false
    } else {
      setFormValidState((state) => ({ ...state, date: true }))
    }
    if (!formProps.mood?.trim().length) {
      setFormValidState((state) => ({ ...state, mood: false }))
      isFormValid = false
    } else {
      setFormValidState((state) => ({ ...state, mood: true }))
    }
    if (!formProps.description?.trim().length) {
      setFormValidState((state) => ({ ...state, description: false }))
      isFormValid = false
    } else {
      setFormValidState((state) => ({ ...state, description: true }))
    }
    if (!isFormValid) {
      return
    }
    addItem(formProps)
  }

  return (
    <form className={styles.JournalForm} onSubmit={addJournalItem}>
      <div className={styles.titleContainer}>
        <label htmlFor="title">
          <BsBookmark className={styles.labelLogo} />
          <span className={styles.labelText}>Название:</span>
        </label>
        <input
          style={{
            background: formValidState.title ? undefined : "rgb(186, 51, 28)"
          }}
          type="text"
          id="title"
          name="title"
          placeholder="название воспоминания..."
        />
      </div>
      <div className={styles.dateContainer}>
        <label htmlFor="date">
          <BsCalendarDate className={styles.labelLogo} />
          <span className={styles.labelText}>Дата:</span>
        </label>
        <input
          style={{
            background: formValidState.date ? undefined : "rgb(186, 51, 28)"
          }}
          type="date"
          id="date"
          name="date"
        />
      </div>
      <div className={styles.moodContainer}>
        <label htmlFor="mood">
          <TbMoodCog className={styles.labelLogo} />
          <span className={styles.labelText}>Настроение:</span>
        </label>
        <input
          style={{
            background: formValidState.mood ? undefined : "rgb(186, 51, 28)"
          }}
          type="text"
          id="mood"
          name="mood"
        />
      </div>
      <div className={styles.description}>
        <label htmlFor="description">
          <BsJournalText className={styles.labelLogo} />
          <span className={styles.labelText}>Описание:</span>
        </label>
        <textarea
          style={{
            background: formValidState.description ? undefined : "rgb(186, 51, 28)"
          }}
          name="description"
          id="description"
          placeholder="расскажите о своём дне..."
        ></textarea>
      </div>

      <button>Сохранить</button>
    </form>
  )
}

export default JournalForm
