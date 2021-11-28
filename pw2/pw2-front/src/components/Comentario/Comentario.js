import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Comentario({ comentario, setLike }) {
  return (
    <li className="list-group-item">
      {comentario.texto}
      <span className="float-end" onClick={() => setLike(comentario.id)} style={{cursor: 'pointer'}}>
        {comentario.like ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeart} style={{color: '#CCCCCC'}}/>}
      </span>
    </li>
  )
}

export default memo(Comentario)
