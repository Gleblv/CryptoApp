import Card from 'react-bootstrap/Card';

const CoinCard = () => {
    return (
        <div className='coin-card'>
            <Card style={{ width: '16rem' }}>
                <Card.Img variant='top' src='#'/>
                <Card.Body>
                    <Card.Title>Name of coin</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CoinCard;