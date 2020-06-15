import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const initialNewColor = { 
  color: '', 
  code: {hex: ''}, 
  id: Date.now()
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialNewColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = color => {
    axiosWithAuth()
     .delete(`/api/colors/${color.id}`)
     .then(res => {
       console.log(res)
       updateColors(res.data)
     })
     .catch(err => {
       console.log(err)
     })
  };

  const addNewColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        console.log(res)
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            console.log(res)
          })
          setNewColor(initialNewColor)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>EDIT COLOR</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">SAVE</button>
            <button onClick={() => setEditing(false)}>CANCEL</button>
          </div>
        </form>
      )}

      {/* Stretch */}
      <form onSubmit={addNewColor}>  
        <legend>ADD COLOR</legend>
        <label>
          color name:
          <input
            onChange={e => 
              setNewColor({ 
                ...newColor, 
                color: e.target.value })
            }
            value={newColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setNewColor({
                ...newColor,
                code: { hex: e.target.value },
              })
            }
            value={newColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Save</button>
          <button onClick={() => setNewColor(false)}>Cancel</button>
        </div>
      </form>

    </div>
  );
};

export default ColorList;