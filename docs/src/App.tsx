import { parseAbelam, arabicToAbelam, Digit, getChunk } from '../../src/main'
import { FaExchangeAlt } from "react-icons/fa"
import Form from 'react-bootstrap/Form'
import { useRef, useState } from 'react';
import { Tree, RawNodeDatum } from 'react-d3-tree';
import Explanation from './Explanation';

const toChartData = (digit: Digit | undefined): RawNodeDatum => {
  if (!digit) {
    return {
      name: "適切な数字を入力してください",
    }
  }

  const chunk = getChunk(digit.chunk);
  if (chunk) {
    return {
      name: `${String(digit.vvalue * (chunk.value || 1))}`,
      children: [
        typeof digit.variable === "string" ? {
          name: `${String(digit.vvalue)} ${digit.variable}`,
        } : {
          name: String(digit.vvalue),
          children: digit.variable.map((v) => toChartData(v))
        },
        {
          name: `* ${chunk.value || ""} ${digit.chunk}`
        }
      ]
    }
  } else {
    return typeof digit.variable === "string" ? {
      name: `${String(digit.vvalue)} ${digit.variable}`,
    } : {
      name: `${String(digit.vvalue)}`,
      children: digit.variable.map((v) => toChartData(v))
    }
  }
}

function ParseDisplay({ abelam }: { abelam: Digit | undefined }) {
  const tree = useRef<Tree>(null);
  return (<div style={{
    height: "100vh",
    border: "var(--bs-border-color) solid",
    borderWidth: "0 1px",
  }}>
    <Tree
      data={toChartData(abelam)}
      translate={{ x: 100, y: 100 }}
      separation={{ siblings: 0.5, nonSiblings: 1 }}
      collapsible={false}
      scaleExtent={{ min: 0.25, max: 2 }}
      ref={tree}
    ></Tree>
  </div>)
}

function ArabicToAbelamForm() {
  const [[arabic, abelam], setArabicAbelam] = useState([0, ""]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value || 0);
    const result = num && num > 0 ? arabicToAbelam(num) : "";
    setArabicAbelam([num, result]);
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control type="number" placeholder="Number" min={1} onChange={handleChange} />
        </Form.Group>
      </Form>
      <p>{abelam}</p>
      <ParseDisplay abelam={parseAbelam(abelam)
        .find((x) => x.vvalue === arabic)} />
    </>
  )
}

function AbelamToArabicForm() {
  const [abelam, setAbelam] = useState("");
  const [selected, setSelected] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbelam(event.target.value.trim());
    setSelected(0);
  }

  const parsedAbelams = parseAbelam(abelam);

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Text" onChange={handleChange} />
        </Form.Group>
        {parsedAbelams.map((digit, i) => (
          <Form.Check
            inline
            key={i}
            id={`${i}`}
            type="radio"
            name="type"
            value={i}
            label={`${digit.vvalue}`}
            checked={selected === i}
            onChange={() => setSelected(i)}
          />
        ))}
      </Form>
      <ParseDisplay abelam={parsedAbelams[selected]} />
    </>
  )
}

function App() {
  const [selected, setSelected] = useState("arabic");

  return (
    <div className='container'>
      <h1>Abelam <FaExchangeAlt /> Numeral</h1>
      <Form>
        {[
          {
            name: "arabic",
            label: "123 to Abelam"
          },
          {
            name: "abelam",
            label: "Abelam to 123"
          },
          {
            name: "explanation",
            label: "Explanation"
          }
        ].map((type) => (
          <Form.Check
            inline
            key={type.name}
            id={type.name}
            type="radio"
            name="type"
            value={type.name}
            label={type.label}
            checked={selected === type.name}
            onChange={() => setSelected(type.name)}
          />))}
      </Form>
      {selected === "explanation" ? <Explanation /> :
        selected === "arabic" ? <ArabicToAbelamForm /> : <AbelamToArabicForm />
      }
      {/* Debug */}
      {/* <p>{[...Array(10001)]
        .map((v, i) => (
          parseAbelam(arabicToAbelam(i)).filter((x) => x.vvalue === i).length === 0 ? i : undefined
        ))
        .filter((x) => x !== undefined)
        .join(", ")}</p> */}
    </div>
  )
}

export default App
