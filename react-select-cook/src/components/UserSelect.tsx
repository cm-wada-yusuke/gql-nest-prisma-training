import React, { memo, useMemo } from "react";
import Select from "react-select";
import styles from "./UserSelect.module.scss";

export type UseSelectProps = {
  selected: User | null;
  setUser: (user: User | null) => void;
};

export type User = {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
};

const sampleUsers: User[] = [
  {
    id: 1,
    name: "john_doe",
    displayName: "John Doe",
    avatarUrl: "https://avatars0.githubusercontent.com/u/1?v=4",
  },
  {
    id: 2,
    name: "alice_smith",
    avatarUrl: "https://avatars0.githubusercontent.com/u/2?v=4",
    displayName: "Alice Smith",
  },
  {
    id: 3,
    name: "shohei_kawaguchi",
    avatarUrl: "https://avatars0.githubusercontent.com/u/3?v=4",
    displayName: "川口昌平",
  },
];

type UserOption = {
  label: string;
  value: number;
  name: string;
  avatarUrl: string;
};

function convertToUser(args: UserOption | null): User | null {
  if (!args) return null;
  return {
    id: args.value,
    name: args.name,
    displayName: args.label,
    avatarUrl: args.avatarUrl,
  };
}

function convertToOption(user: User): UserOption {
  return {
    label: user.displayName,
    value: user.id,
    name: user.name,
    avatarUrl: user.avatarUrl,
  };
}

// コンポーネントに何かしら変化があるたびにレンダリングされてしまうのでメモ化する
const FormatOptionLabel = memo(({ option }: { option: UserOption }) => (
  <div className={styles.userSelect}>
    <img
      src={option.avatarUrl}
      alt={option.name}
      className={styles.avatar}
      width={40}
      height={40}
      referrerPolicy="no-referrer"
    />
    <div>{option.label}</div>
  </div>
));

export const UserSelect: React.FC<UseSelectProps> = ({ setUser, selected }) => {
  const value = useMemo(
    () => (selected ? convertToOption(selected) : null),
    [selected]
  );

  function onChange(newUser: UserOption | null) {
    setUser(convertToUser(newUser));
  }

  return (
    <Select
      instanceId="userSelect"
      value={value}
      onChange={onChange}
      options={sampleUsers.map(convertToOption)}
      formatOptionLabel={(option) => <FormatOptionLabel option={option} />}
      className={styles.container}
      classNamePrefix="rs"
      isClearable={true}
      isSearchable={true}
      getOptionLabel={(option) => option.label + option.name}
      noOptionsMessage={() => "ユーザーはいません"}
      placeholder="メッセージを送るユーザーを選んでください"
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
};
