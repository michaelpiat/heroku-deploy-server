/*NEED TO UPDATE THIS WITH OUR RECIPES MODEL TO INCLUDE THE FOLLOWING FIELDS:
  Title, Ingredients, Source, Source URL, Picture URL (All from Edaman, or when the user creates one)
  
  --ALSO NEEDED FIELDS:
  Notes (Annotatiosn the user can add to Edaman recipes or the recipes the user creates)
  Saved (default: False, a Boolean to say if it's saved to the user's MyCookbook), 
  List (default: False, a Boolean to say if it's added to the Shopping List or not)
*/
// ^^^^^^^^ is done. need to review.

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Name required"
  },
    ingredients: {
    type: String,
    trim: true,
    required: "Ingredients required"
  },
    source: {
    type: String,
    trim: true,
  },
    sourceURL: {
      type: String,
      trim: true
  },
    picURL: {
      type: String,
      trim: true,
      default: "/static/media/vegetables-default.jpg"
  },
    notes: {
      type: String,
      trim: true,
      default: ""
  },
    saved: {
      type: Boolean,
      default: false
  },
    list: {
      type: Boolean,
      default: false
  }
});

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
