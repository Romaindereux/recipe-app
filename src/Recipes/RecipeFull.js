import {Link, Route, Switch} from "react-router-dom";


function RecipeFull(props) {
    const { name, cooking_time, preparation_time, number_of_people, ingredients, ingredients_amount, instructions } = props.recipe;
    const ingredientObj = {};
    function mapThrew2Array(ingredients, amount){
        ingredients.map((ingredient, i) => {
            ingredientObj[ingredient]=amount[i];
        }
        )
    }
    mapThrew2Array(ingredients, ingredients_amount);
    return (
        <div className="container">
            <h1>Recette du {name}</h1>
            <p>Temps de cuisson: {cooking_time} minutes</p>
            <p>Temps de préparation: {preparation_time} minutes</p>
            <p>Préparation pour {number_of_people} personnes</p>
            <div className="col-2 col-sm-2">
                <table className="table">
                    <tbody>
                    <tr>
                        <td><strong>{"Ingredient"}</strong></td>
                    {ingredients && ingredients.map(ingredient => <td>{ingredient}</td>)}
                    </tr>
                    <tr>
                        <td><strong>{"Quantity"}</strong></td>
                    {ingredients_amount && ingredients_amount.map(amount => <td>{amount}</td>)}
                    </tr>
                    <tr>
                        <td><strong>{"Unit"}</strong></td>
                        {ingredients_amount && ingredients_amount.map(amount => <td>{"grams"}</td>)}
                    </tr>
                    </tbody>
                </table>
            </div>
            <ol>
                {instructions && instructions.map(instruction => <li>{instruction}</li>)}
            </ol>
        </div>
    );
}

export default RecipeFull;