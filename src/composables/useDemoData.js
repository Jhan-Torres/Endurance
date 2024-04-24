export default function() {
  const booksData = [
    {
      title: "Book 1",
      autor: "Autor 1",
      category: "programming",
      status: "reading",
    },
    {
      title: "Book 2",
      autor: "Autor 2",
      category: "psychology",
    },
    {
      title: "Book 3",
      autor: "Autor 3",
      category: "astronomy",
    },
    {
      title: "Book 4",
      autor: "Autor 4",
      category: "research",
    },
  ]

  const booksDroppedData = [];
  booksData.forEach((item, index) => {
    if(booksData[index]?.status) booksDroppedData.push(item);
  })

  const notesData = [
    {
      title: "Book 1",
      content: "Content 1",
      category: "programming",
    },
    {
      title: "Book 2",
      content: "Content 2",
      category: "course",
    },
    {
      title: "Book 3",
      content: "Content 3",
      category: "medicine",
    },
    {
      title: "Book 4",
      content: "Content 4",
      category: "tools",
    },
  ]

  return {
    booksData,
    booksDroppedData,
    notesData
  }
}