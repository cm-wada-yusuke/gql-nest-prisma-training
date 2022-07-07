import type { NextPage } from "next";
import { useState } from "react";
import { MultiUsersSelect } from "../components/MultiUsersSelect";
import { User, UserSelect } from "../components/UserSelect";

import styles from "./index.module.scss";

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>({
    id: 2,
    name: "alice_smith",
    avatarUrl: "https://avatars0.githubusercontent.com/u/2?v=4",
    displayName: "Alice Smith",
  });

  const [users, setUsers] = useState<User[]>([]);
  return (
    <div className={styles.userSelect}>
      <div className={styles.selected}>
        selected: {users.map((u) => u.displayName + ' ')}
      </div>
      {/* <UserSelect setUser={setUser} selected={user} /> */}
      <MultiUsersSelect setUsers={setUsers} selected={users} />
    </div>
  );
};

export default Home;
