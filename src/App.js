import React, {useState} from "react";
import { Formik, Form, Field } from "formik";
import "./header.css"
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState([])
  console.log(photos)
  
  const open = url => window.open(url)

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: " " }}
          onSubmit={ async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID u_Lko7p5fegpIQJf9fEPe7gX8T0iJW4foXK4MHX7uI4",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => {
            return (
              <article key={photo.id} onClick={() => open(photo.links.html)}>
                <img src={photo.urls.regular} />
                <p>{[photo.description, photo.alt_description].join(" - ") }</p>
              </article>
            )
          })}
          </div>
      </div>
    </div>
  );
};

export default App;
