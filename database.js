import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`
            CREATE TABLE IF NOT EXISTS tasks (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              task TEXT,
              date TEXT,
              status INTEGER,
              category TEXT
            );
          `);
      },
      reject,
      resolve
    );
  });
}
export async function addTask(date, text, category) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO tasks (task, date, status, category) VALUES (?, ?, ?, ?)",
          [text, date, 0, category],
          resolve,
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}
export async function deleteTask(ID) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from tasks where ID = ? ",
          [ID],
          resolve,
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}
export async function getTasks() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => reject(error)
      );
    }, reject);
  });
}
export async function selectTasksByDate(date) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tasks where date = ?",
        [date],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => reject(error)
      );
    }, reject);
  });
}
export async function updateStatus(ID, status) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update tasks set status=? where ID = ? ",
          [status, ID],
          resolve,
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}
export async function getDates() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT DISTINCT date FROM tasks",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => reject(error)
      );
    }, reject);
  });
}
export async function getCompleted() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT COUNT(ID) as id FROM tasks WHERE status = 1;",
          [],
          (_, { rows }) => {
            resolve(rows.item(0).id);
          },
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}

export async function getPending() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT COUNT(ID) as id  FROM tasks WHERE status = 0;",
          [],
          (_, { rows }) => {
            resolve(rows.item(0).id);
          },
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}
export async function getCategory() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT category, count(*) AS value FROM tasks WHERE status = 0 GROUP BY category ORDER BY value DESC;",
          [],
          (_, { rows }) => {
            resolve(rows._array);
            console.log(rows._array);
          },
          (_, error) => reject(error)
        );
      },
      reject,
      resolve
    );
  });
}
