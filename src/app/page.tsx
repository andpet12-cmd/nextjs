import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>

      <form action="/submit" method="POST">
        <input type="text" name={'name'} placeholder={'login'} />
        <input type="text" name={'password'} placeholder={'password'} />
        <button>submit</button>

      </form>


    </div>
  );
}
