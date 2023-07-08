const Card = ({area, capital, continent, flag, id, name, population, subregion}) => {
    return(
        <div>
            <h2>
                {id}
            </h2>
            <h1>
                {name}
            </h1>
            <div>
                {capital}
            </div>
        </div>
    )
}

export default Card;