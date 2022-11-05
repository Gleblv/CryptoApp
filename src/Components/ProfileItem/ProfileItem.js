import './ProfileItem.css';

const ProfileItem = ({id, count, name, symbol, price, deleteCoin}) => {
    return (
        <div className='profile-list-item'>
            <div className='profile-item-count'>
                {count}
            </div>
            <div className='profile-item-name'>
                {name}
            </div>
            <div className='profile-item-symbol'>
                {symbol}
            </div>
            <div className="profile-item-price">
                {price}$
            </div>
            <div className='profile-control-buttons'>
                <button className='coin-delete-btn' onClick={() => deleteCoin(id)}>Delete coin</button>
            </div>
        </div>
    )
}

export default ProfileItem;