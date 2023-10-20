import React, { useEffect, useReducer, useRef } from "react"
import { BsCalendarDate, BsJournalText, BsBookmark } from "react-icons/bs"
import { TbMoodCog } from "react-icons/tb"
import cn from "classnames"
import styles from "./JournalForm.module.css"
import { INITIAL_STATE, formReducer } from "./JournalForm.state"

const JournalForm = ({ addItem }) => {
  // использование useReducer
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const { isValid, values, isFormReadyToSubmit } = formState // деструктуризация состояния
  // использование useRef
  const titleRef = useRef() // в элементе атрибут ref={titleRef}
  const dateRef = useRef()
  const moodRef = useRef()
  const descriptionRef = useRef()

  // Функция для фокуса по невалидным элементам
  const focusError = (isValid) => {
    if (!isValid.title) titleRef.current.focus()
    else if (!isValid.date) dateRef.current.focus()
    else if (!isValid.mood) moodRef.current.focus()
    else if (!isValid.description) descriptionRef.current.focus()
  }

  useEffect(() => {
    let timer
    if (!isValid.title || !isValid.date || !isValid.mood || !isValid.description) {
      focusError(isValid)
      timer = setTimeout(() => dispatchForm({ type: "RESET_VALIDITY" }), 1500)
    }
    return () => clearTimeout(timer)
  }, [isValid])

  //отслеживаем isFormReadyToSubmit, если true отправляем данные
  useEffect(() => {
    if (isFormReadyToSubmit) {
      addItem(values)
      dispatchForm({ type: "CLEAR" })
    }
  }, [isFormReadyToSubmit])

  const changeValue = (e) => {
    // e.target.name - имя поля
    // e.target.value - значение поля
    // [] - для получения computed key в объекте
    dispatchForm({ type: "SET_VALUE", payload: { [e.target.name]: e.target.value } })
  }

  const addJournalItem = (e) => {
    e.preventDefault()
    dispatchForm({ type: "SUBMIT" })
  }

  return (
    <form className={styles.JournalForm} onSubmit={addJournalItem}>
      <div className={styles.titleContainer}>
        <label htmlFor="title">
          <BsBookmark className={styles.labelLogo} />
          <span className={styles.labelText}>Название:</span>
        </label>
        <input
          // для cn:
          // выражения заключаются в {}
          // несколько классов указываются через запятую:
          // className={cn(styles["test"], { [styles["invalid"]]: !formValidState.title })}
          className={cn({ [styles["invalid"]]: !isValid.title })}
          type="text"
          id="title"
          name="title"
          placeholder="название воспоминания..."
          onChange={changeValue}
          ref={titleRef}
          value={values.title}
        />
      </div>
      <div className={styles.dateContainer}>
        <label htmlFor="date">
          <BsCalendarDate className={styles.labelLogo} />
          <span className={styles.labelText}>Дата:</span>
        </label>
        <input
          className={cn({ [styles["invalid"]]: !isValid.date })}
          type="date"
          id="date"
          name="date"
          onChange={changeValue}
          ref={dateRef}
          value={values.date}
        />
      </div>
      <div className={styles.moodContainer}>
        <label htmlFor="mood">
          <TbMoodCog className={styles.labelLogo} />
          <span className={styles.labelText}>Настроение:</span>
        </label>
        <input
          className={cn({ [styles["invalid"]]: !isValid.mood })}
          type="text"
          id="mood"
          name="mood"
          onChange={changeValue}
          ref={moodRef}
          value={values.mood}
        />
      </div>
      <div className={styles.description}>
        <label htmlFor="description">
          <BsJournalText className={styles.labelLogo} />
          <span className={styles.labelText}>Описание:</span>
        </label>
        <textarea
          className={cn({ [styles["invalid"]]: !isValid.description })}
          name="description"
          id="description"
          placeholder="расскажите о своём дне..."
          onChange={changeValue}
          ref={descriptionRef}
          value={values.description}
        ></textarea>
      </div>

      <button>Сохранить</button>
    </form>
  )
}

export default JournalForm
