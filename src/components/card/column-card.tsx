import { useState } from 'react';
import Modal from '../modal/modal';
import './column-card.scss';

type Props = {};

export default function ColumnCard({}: Props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      className='column__card'
      onClick={() => {
        setShowModal(true);
        console.log('setShowModalTrueClicked');
      }}
    >
      card title
      {showModal ? (
        <Modal
          onClose={() => {
            setShowModal(false);
            console.log('onCloseClicked');
          }}
        >
          text
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}
