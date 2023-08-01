import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Title, Subtitle } from '../../themes/textStyles';
import { Text } from '../../themes/textStyles';
import { SubmitButton } from '../Buttons/SubmitButton';
import { CommonButton } from '../Buttons/CommonButton';
import { Form } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import { PURPLE, WHITE } from '../../themes/colors';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/storeInterface';
import { updateCacheTypes, updateContainerTypes, updateDifficulty, updatePlanningArea, updateTerrain } from '../../pages/GeocachesPage/GeocachesTable/geocachesTableSlice';
import { 
  CACHE_TYPE_EARTH,
  CACHE_TYPE_EVENT,
  CACHE_TYPE_LETTERBOX,
  CACHE_TYPE_MULTICACHE,
  CACHE_TYPE_MYSTERY,
  CACHE_TYPE_TRADITIONAL, 
  CACHE_TYPE_VIRTUAL,
  CACHE_TYPE_WHEREIGO,
  CONTAINER_TYPE_LARGE,
  CONTAINER_TYPE_MICRO,
  CONTAINER_TYPE_NOT_SPECIFIED,
  CONTAINER_TYPE_OTHER,
  CONTAINER_TYPE_REGULAR,
  CONTAINER_TYPE_SMALL,
  CONTAINER_TYPE_VIRTUAL,
  PLANNING_AREAS
} from './constants';

export const PopupModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    console.log("close")
    setShow(false)
  }

  const handleShow = () => setShow(true);

  const [currentValue, setCurrentValue] = useState(0)

  const difficulty = useSelector((state: any) => state.geocachesTable.difficulty)
  const terrain = useSelector((state: any) => state.geocachesTable.terrain)
  const planning_area = useSelector((state: any) => state.geocachesTable.planning_area)
  const cache_types = useSelector((state: any) => state.geocachesTable.cache_types)
  const container_types = useSelector((state: any) => state.geocachesTable.container_types)

  const dispatch = useDispatch<AppDispatch>();

  
  return (
    <>
      <CommonButton
        text={"Filter"}
        action={handleShow}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Subtitle>Filters to apply</Subtitle>
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            <Form.Group>
           
           <InputModalContainer>
            <Form.Label>
              <Text>Planning area selected : {planning_area}</Text>
            </Form.Label>  
            <StyledFormSelect>
              {PLANNING_AREAS.map((area) => (
                   <StyledOption 

                    onClick={(e) => dispatch(updatePlanningArea(area))}
                    >
                  <Text>{area}</Text>
                </StyledOption>

              ))}
            </StyledFormSelect>
           </InputModalContainer>
          
          <InputModalContainer>
            <Form.Label><Text>Difficulty less than or equal to {difficulty}</Text></Form.Label>
            <StyledFormRange min="1" max="5" value={difficulty} onChange={(e) => dispatch(updateDifficulty(e.target.value))} />
          </InputModalContainer>

          <InputModalContainer>
            <Form.Label><Text>Terrain less than or equal to {terrain}</Text></Form.Label>
            <StyledFormRange min="1" max="5"  value={terrain} onChange={(e) => dispatch(updateTerrain(e.target.value))} />
          </InputModalContainer>

          <CheckboxContainer>
          <InputModalContainer>
            <Form.Label><Text>Cache Type</Text></Form.Label>
            <MultiselectContainer>
            <StyledFormCheck
              label="Traditional"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_TRADITIONAL] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_TRADITIONAL))}
            />
            <StyledFormCheck
              label="Multi-Cache"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_MULTICACHE] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_MULTICACHE))}
            />
            <StyledFormCheck
              label="Virtual"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_VIRTUAL] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_VIRTUAL))}
            />
            <StyledFormCheck
              label="Letterbox"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_LETTERBOX] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_LETTERBOX))}
            />
            <StyledFormCheck
              label="Event"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_EVENT] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_EVENT))}
            />
            <StyledFormCheck
              label="Mystery"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_MYSTERY] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_MYSTERY))}
            />
            <StyledFormCheck
              label="Earth"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_EARTH] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_EARTH))}
            />
            <StyledFormCheck
              label="Whereigo"
              type={"checkbox"}
              checked={cache_types[CACHE_TYPE_WHEREIGO] || false }
              onChange={(e:any) => dispatch(updateCacheTypes(CACHE_TYPE_WHEREIGO))}
            />

            </MultiselectContainer>

          </InputModalContainer>

          <InputModalContainer>
            <Form.Label><Text>Container Type</Text></Form.Label>
            <StyledFormCheck
              label="Micro"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_MICRO] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_MICRO))}
            />
            <StyledFormCheck
              label="Small"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_SMALL] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_SMALL))}
            />
            <StyledFormCheck
              label="Regular"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_REGULAR] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_REGULAR))}
            />
            <StyledFormCheck
              label="Large"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_LARGE] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_LARGE))}
            />
            <StyledFormCheck
              label="Virtual"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_VIRTUAL] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_VIRTUAL))}
            />
            <StyledFormCheck
              label="Other"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_OTHER] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_OTHER))}
            /> 
            <StyledFormCheck
              label="Not specified"
              type={"checkbox"}
              checked={container_types[CONTAINER_TYPE_NOT_SPECIFIED] || false }
              onChange={(e:any) => dispatch(updateContainerTypes(CONTAINER_TYPE_NOT_SPECIFIED))}
            />                    
          </InputModalContainer>


          </CheckboxContainer>
          

        

            </Form.Group>
            

            

          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

const StyledFormSelect = styled(Form.Select)`
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
font-family: 'Jost', sans-serif;
font-family: 'Karla', sans-serif;
`

const StyledOption = styled.option`
  font-family: 'Jost', sans-serif;
  font-family: 'Karla', sans-serif;
`

const CheckboxContainer = styled.div`
  display:flex;
  flex-direction:row;

`

const StyledFormCheck = styled(Form.Check)`
font-size: 1rem;
font-family: 'Jost', sans-serif;
font-family: 'Karla', sans-serif;

`

const MultiselectContainer = styled.div`

  display:flex;
  flex-direction:column;
  align-items:flex-start;
`

const InputModalContainer = styled.div`
  margin-bottom:5%;
  margin-top:5%;
  margin-left:2%;
  margin-right:2%;

`

const StyledFormRange = styled(Form.Range)`
  
`

const StyledDropdown = styled(Dropdown)`
    background-color:${WHITE};
    border-color: ${PURPLE};
    color: ${PURPLE};
    margin-left:0.5vw;
    margin-right:0.5vw;

    &:hover {
        background-color: ${PURPLE};
        border-color: ${PURPLE};
    }

    &:active:focus {
        background-color: ${PURPLE};
        border-color: ${PURPLE};
    }
`

export default PopupModal;


