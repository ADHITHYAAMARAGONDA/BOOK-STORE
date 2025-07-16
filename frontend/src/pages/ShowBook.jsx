import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axiosInstance from "../utils/axiosInstance"; // ✅ Use this instead of plain axios
import { useSnackbar } from "notistack";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/books/${id}`) // ✅ Base URL + token handled by axiosInstance
      .then((response) => {
        setBook(response.data.data); // ✅ .data.data based on your backend response format
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response?.status === 401) {
          enqueueSnackbar("Unauthorized! Please sign in again.", {
            variant: "error",
          });
          localStorage.clear();
          navigate("/signin");
        } else {
          enqueueSnackbar("Failed to fetch book", { variant: "error" });
        }
      });
  }, [id, navigate, enqueueSnackbar]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
