import React, { useEffect, useState } from "react";
import "./styles/List.less";
import HeightLightText from "react-highlight-words";

const data = [
  {
    id: 1,
    name: "Jack",
    email: "111@qq.com",
    tags: [
      {
        tagId: 1,
        tagName: "My Family",
      },
      {
        tagId: 2,
        tagName: "My Family",
      },
      {
        tagId: 3,
        tagName: "My Family",
      },
      {
        tagId: 4,
        tagName: "My Family",
      },
      {
        tagId: 5,
        tagName: "My Family",
      },
    ],
  },
  {
    id: 2,
    name: "CiciCici CiciCiciCici CiciCiciCici",
    email: "123@qq.com",
    tags: [],
  },
  {
    id: 3,
    name: "Mack",
    email: "1111111111111111@qq.com",
    tags: [],
  },
];

export default function List() {
  const [arr, setArr] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [order, setOrder] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    setArr(data);
  }, []);
  const handleOrder = () => {
    if (order > 1) {
      setOrder(1);
      setFilteredData(
        filteredData.sort((a, b) => {
          return b.name.localeCompare(a.name);
        })
      );
      return;
    }
    setOrder(order + 1);
    setFilteredData(
      filteredData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
    );
  };
  // 正则表达式，匹配姓名或邮箱
  // const regex = /([a-zA-Z\s\-']+)|(\b[\w\.-]+@[\w\.-]+\.\w{2,}\b)/;
  const handleSearch = (searchText: string) => {
    setText(searchText);
    if (!searchText.length) {
      setFilteredData(arr);
      return;
    }

    const filteredData = arr.filter((item) => {
      return (
        item.name.toLocaleLowerCase().includes(searchText) ||
        item.email.toLocaleLowerCase().includes(searchText)
      );
    });
    // debugger
    setFilteredData(filteredData);
    console.log(filteredData);
  };
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={({ target: { value } }) => handleSearch(value)}
      />
      <table className="table">
        <colgroup>
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead>
          <tr>
            <td onClick={handleOrder}>Name</td>
            <td>Email</td>
            <td>Tag</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            return (
              <tr key={item.id}>
                <td className="name">
                  <HeightLightText
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[text]}
                    autoEscape
                    textToHighlight={item.name ? item.name.toString() : ""}
                  />
                </td>
                <td className="email">{item.email}</td>
                <td className="tags">
                  {item.tags.map((tag) => {
                    return (
                      <span key={tag.tagId} className="tagBox">
                        {tag.tagName}
                      </span>
                    );
                  })}
                </td>
                <td>
                  <div className="options"></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
