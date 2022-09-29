import style from './CreateVideogame.module.css';
import { useState, useEffect } from 'react'

import { connect } from 'react-redux';
import { createVideogame, getGenres, getPlatforms } from '../../../redux/actions';
import Navbar from '../../Navbar/Navbar';

let validateName = /^[a-zA-Z\s]+$/;

function validate(input) {
  const errors = {};
  if (!input.name.length) errors.name = 'Please complete with a videogame name';
  if (!validateName.test(input.name)) errors.title = 'Special characters or numbers are not allowed';
  if (!input.description.length) errors.description = 'This field cannot be empty';
  if (input.description.length < 40 || input.description.length>1000) 
  errors.description = 'This field must be at least 40 characters and less than 1000';
  if (input.rating < 0 || input.rating > 5) errors.rating = 'The rating must be a number between 0.0 and 5.0';
  if (!input.released.length) errors.released = 'This field cannot be empty';
  if (!Date.parse(input.released)) errors.released = 'This field should have the format "YYYY-MM-DD"';
  if (!input.genres.length) errors.genres = 'This field should have at least one genre selected.';
  if (!input.platforms.length) errors.platforms = 'This field should have at least one platform selected.';
  return errors;
};

function CreateVideogame( { getGenres, getPlatforms, createVideogame, genres, platforms } ) {
  const [input, setInput] = useState({
    name: '',
    description: '',
    rating: 0.0,
    released: '',
    genres: [],
    platforms: [],
    image:''
});
const [errors, setErrors] = useState({});
const [render, setRender]= useState('');

function handleInputChange(e) {
  e.preventDefault();
  setInput((prevInput)=>{
    const newInput ={ ...prevInput,
      [e.target.name]: e.target.value
    }
    const validations =validate(newInput);
    setErrors(validations);
    return newInput;
  });
};
function handleGenre(e){
  let newArray = input.genres;
  let find = newArray.indexOf(e.target.value);
  
  if (find >= 0) {
      newArray.splice(find, 1)
  } else {
      newArray.push(e.target.value)
  }
  setInput({
      ...input,
      genres: newArray
  });
};
function handlePlatform(e){
  let newArray = input.platforms;
  let find = newArray.indexOf(e.target.value);
  
  if (find >= 0) {
      newArray.splice(find, 1)
  } else {
      newArray.push(e.target.value)
  }
  setInput({
      ...input,
      platforms: newArray
  });
};
function handleSubmit(e) {
  e.preventDefault();
  if (Object.values(errors).length===0 && input.name){
    createVideogame(input);
    setRender('Your videogame has been created succesfully');
    setInput({
        name: '',
        description: '',
        rating: 0.0,
        released: '',
        genres: [],
        platforms: [],
        image: ''
    });
  }
  else
  setRender('Please complete the information required');
}

 useEffect(() => {
   getGenres(); // eslint-disable-next-line react-hooks/exhaustive-deps
   getPlatforms();
 }, []);
return (
  <div >
      <Navbar />
    <div className={style.AppCreate}>
      <div className={style.CreateBody}>
          <form className={style.CreateForm}>
              <div className={style.titleCreate}>
                   <h2>CREATE VIDEOGAME</h2>
              </div>
                <div key="formInputs1" className={style.nameInputs}>
                    <label key="label1" className={style.labels}>Name: </label>
                    <input key="input1" className={style.titleInput} autoComplete="off" 
                    type="text" name="name" onChange={handleInputChange} value={input.name}/>
                {errors.name && (<span className={style.msgs}>{errors.name}</span>)}
                </div>

              <div key="formInputs2" className={style.nameInputs}>
                  <label key="label2" className={style.labels}>Description:</label>
                  <textarea 
                  name="description" type="text" rows="2" cols="40"
                  key="input2" className={style.descriptionInput} autoComplete="off" 
                  onChange={handleInputChange} value={input.description}/>
                  {errors.description && (<span className={style.msgs}>{errors.description}</span>)}
              </div>

              <div className={style.nameInputs}>
                      <label className={style.labels}>Rating: {input.rating}</label>
                      <input  name="rating" 
                              className={style.nameInput}
                              type="range"
                              step="0.01" 
                               min="0.0" max="5.0" 
                              value={input.rating} 
                              onChange={e => handleInputChange(e)}/>
                     { errors.rating && (<span className={style.msgs}>{errors.rating}</span>)}
                </div>

              <div key="formInputs3" className={style.nameInputs}>
                    <label key="label3" className={style.labels}>Released: </label>
                    <input key="input3" className={style.titleInput} autoComplete="off" 
                    type="text" name="released" onChange={handleInputChange} value={input.released}/>
                {errors.released && (<span className={style.msgs}>{errors.released}</span>)}
                </div>

                  <div key="formInputs4" className={style.nameInputs}>
                  <label className={style.labels}>Genres:</label>
                      <div key="genres" className={style.checks}>
                            {
                            genres && genres.map(genre => (
                            <div key={genre.id} className={style.genresCheck}>
                                <label key={genre.id}>
                                    <input 
                                         type='checkbox'
                                         name={genre.name} 
                                         value={genre.name}
                                         onChange={(e) => handleGenre(e)} 
                                         />
                                         {genre.name}
                                 </label>
                            </div>
                            ))
                            }
                        </div>      
                  </div>

                  <div key="formInputs6" className={style.nameInputs}>
                  <label className={style.labels}>Platforms:</label>
                      <div key="platforms" className={style.checks}>
                            {
                            platforms && platforms.map(platform => (
                            <div key={platform.id} className={style.genresCheck}>
                                <label key={platform.id}>
                                    <input 
                                         type='checkbox'
                                         name={platform.name} 
                                         value={platform.name}
                                         onChange={(e) => handlePlatform(e)} 
                                         />
                                         {platform.name}
                                 </label>
                            </div>
                            ))
                            }
                        </div>      
                  </div>


              <div key="formInputs5" className={style.nameInputs}>
                  <label key="label5" className={style.labels}>Image:</label>
                  <input key="input5" className={style.titleInput} autoComplete="off" 
                    type="text" name="image" placeholder='URL image (optional)' onChange={handleInputChange} value={input.image}/>
              </div>{errors.image && (<span className={style.msgs}>{errors.image}</span>)}
              
              {render[0] &&
                      <div id={style.videogamecreated}>
                      
                      {render}
                      </div>
                  }
                  <input key="submitButton" type="submit" value="submit" id={style.submitButton} onClick={handleSubmit}></input>
            </form>
          </div>
      </div>
  </div>
)

}
const mapStateToProps = (state) => {
return {
  genres: state.genres,
  platforms: state.platforms
}
}

const mapDispatchToProps = dispatch => {
return {
  getGenres: () => dispatch(getGenres()),
  getPlatforms: () => dispatch(getPlatforms()),
  createVideogame: (input) => dispatch(createVideogame(input))
}
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateVideogame);
