import React, { useEffect } from "react";
import { Col, message, Row } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../apicalls/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./home.css"; // Import the CSS file for animations

function Home() {
  const [searchText = "", setSearchText] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getColumnCount = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1200) {
      return 4; // Display 4 columns for large screens
    } else if (screenWidth >= 768) {
      return 3; // Display 3 columns for medium-sized screens
    } else {
      return 1; // Display 1 column for small screens
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Row gutter={[20]} className="mt-2">
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((movie, index) => (
            <Col
              key={movie._id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              xxl={6}
              style={{ marginBottom: "16px" }}
            >
              <div
                className={`card flex flex-col gap-1 cursor-pointer ${
                  index % 2 === 0 ? "slide-left" : "slide-right"
                }`}
                onClick={() =>
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                  )
                }
              >
                <img src={movie.poster} alt="" height={200} />

                <div className="flex justify-center p-1">
                  <h1 className="text-md uppercase">{movie.title}</h1>
                </div>
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default Home;
