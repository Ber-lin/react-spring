import React, { DependencyList, EffectCallback, useEffect, useState } from "react";
import "wc-waterfall";

const deepCompare=(a:DependencyList,b:DependencyList)=>{
    if(a.length!==b.length){
        return false;
    }
    for(let i=0;i<a.length;i++){
        if(a[i]!==b[i]){
            return false;
        }
    }
    return true;
}
const useDeepCompareEffect=(effect:EffectCallback,dependence:DependencyList)=>{

    const ref=React.useRef<DependencyList>(null)
    const signalRef=React.useRef(0)
    if(!deepCompare(dependence,ref.current)){
        ref.current=dependence;
        signalRef.current+=1;
    }
    useEffect(effect,[signalRef.current])
}

export default function Waterfall() {
  const [obj, setObj] = useState({ a: "1" });

  useDeepCompareEffect(() => {
    console.log("渲染");
  }, [obj]);

  return (
    <div>
      UseDeepCompareEffectDemo:
      <button onClick={() => setObj({ a: "2" })}>setObj</button>
    </div>
  );
}
