import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5555/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          enqueueSnackbar("Failed to fetch book", { variant: "error" });
        }
      });
  }, [id, navigate, enqueueSnackbar]);

  const handleUpdate = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true);
    axios
      .put(
        `http://localhost:5555/books/${id}`,
        { title, author, publishYear: Number(publishYear) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          enqueueSnackbar("Failed to update book", { variant: "error" });
        }
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-500 px-4 py-2 my-2"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-500 px-4 py-2 my-2"
          />
          <input
            type="number"
            placeholder="Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border border-gray-500 px-4 py-2 my-2"
          />
          <button
            className="p-2 bg-sky-300 m-4 hover:bg-sky-400 transition"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBook;
