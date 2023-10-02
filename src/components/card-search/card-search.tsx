import './card-search.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { useSelector } from 'react-redux';
import { TStore } from '../../services/redux/reducers';
import { TTodosState } from '../../services/redux/reducers/todos';
import { TTodoCard } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/button/my-button';
type Props = {};

export default function CardSearch({}: Props) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [inputOnFocus, setInputOnFocus] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<TTodoCard[]>([]);
  const location = useLocation();

  const { todos } = useSelector<TStore, TTodosState>((state) => state.todos);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInputOnFocus(false);
        setFilteredTodos([]);
        if (searchInput.current) {
          searchInput.current.value = '';
          searchInput.current.blur();
        }
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setInputOnFocus]);

  const compareStrings = (a: string, b: string) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const searchCards = useCallback(() => {
    const filteredTodos = [...todos].filter((todo) => {
      const todoTitle = todo.title.split(' ');
      const searchInputValue = searchInput.current?.value;
      if (searchInputValue) {
        const searchTitle = searchInputValue.split(' ');

        if (searchTitle) {
          if (searchTitle.length === 1) {
            const res = todoTitle.map((word) => {
              return compareStrings(searchTitle[0].toLowerCase(), word.toLowerCase());
            });

            if (res.find((el) => el === true)) return todo;
          }

          if (searchTitle.length > 1) {
            const isEqual = compareStrings(
              searchInputValue.toLowerCase(),
              todo.title.toLowerCase()
            );
            if (isEqual) return todo;
          }
        }
      }
    });

    if (filteredTodos.length === 0) {
      setFilteredTodos(
        [...todos].filter((todo) => {
          const searchInputValue = searchInput.current?.value;
          if (searchInputValue) {
            if (compareStrings(searchInput.current?.value, todo.number.toString())) {
              return todo;
            }
          }
        })
      );
    } else {
      setFilteredTodos([...filteredTodos]);
    }
  }, [todos, searchInput]);

  return (
    <div className='cardSearch__container'>
      <div className={`${inputOnFocus && 'cardSearch__input-focused'} cardSearch__input`}>
        <FiSearch
          onClick={() => {
            if (searchInput.current) {
              searchInput.current.focus();
            }
          }}
          size={25}
        />
        <input
          onFocus={() => {
            setInputOnFocus(true);
          }}
          ref={searchInput}
          placeholder='Search card...'
          onChange={() => {
            searchCards();
          }}
          type='text'
        />
      </div>
      {inputOnFocus && (
        <div className='cardSearch__results'>
          {filteredTodos.length === 0 ? (
            <h1>Nothing found</h1>
          ) : (
            filteredTodos.map((todo) => {
              return (
                <Link className='Link' to={`card/${todo.number}`} state={{ background: location }}>
                  <div>{todo.title}</div>
                </Link>
              );
            })
          )}
          <Button
            type='primary'
            onClick={() => {
              setInputOnFocus(false);
            }}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
