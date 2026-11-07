import type { ModelCard } from "../types";

const tex = String.raw;

export const CONGRUENCE_REST_MODELS: ModelCard[] = [
  {
    id: "one-line-three-perp",
    name: "一线三垂直模型",
    alias: ["K 字型模型", "三垂直全等模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 2,
    importance: 5,
    mnemonic: "一条直线三个直角，K 字一现；两侧直角三角形全等，边边互换、和差自明。",
    summary:
      "同一条直线上出现三个直角顶点，且中间那个角的两边相等时，两侧的直角三角形全等，可把线段“上下互换”，得到线段的和差关系。",
    definition:
      tex`如图，点 $B$、$A$、$C$ 在同一条直线 $l$ 上，$D$、$E$ 在 $l$ 的同侧，$DB\perp l$ 于 $B$，$EC\perp l$ 于 $C$，且 $\angle DAE=90^\circ$、$AD=AE$。则 $\triangle ABD\cong\triangle ECA$，于是 $AB=CE$、$BD=AC$、$BC=BD+CE$。三个直角的顶点 $B$、$A$、$C$ 都落在直线 $l$ 上，所以叫“一线三垂直”；图形像字母 K，也叫 K 字型。`,
    conditions: [
      "同一条直线上依次出现三个点，其中两个点处立有垂线",
      "有三个直角，且三个直角的顶点共线（$B$、$A$、$C$ 在 $l$ 上）",
      "中间那个直角的两边相等：$\\angle DAE=90^\\circ$ 且 $AD=AE$",
      "两个直角三角形分居中间顶点的两侧，$D$、$E$ 在直线同侧",
      "结论形如 $BC=BD+CE$ 的线段和，或要求 $AB$ 与 $CE$、$BD$ 与 $AC$ 的对应关系",
      "背景常是等腰直角三角形、正方形，或坐标系中斜放的直角",
    ],
    triggers: ["一线三垂直", "K 字型", "三个直角", "三点共线", "等腰直角三角形", "线段和差", "求 BC"],
    figure: "one-line-three-perp",
    auxSteps: [
      {
        step: 1,
        title: "过 $D$、$E$ 分别向直线作垂线",
        detail: tex`过 $D$ 作 $DB\perp l$ 于 $B$，过 $E$ 作 $EC\perp l$ 于 $C$，把 $AD$、$AE$ 分别放进 $\mathrm{Rt}\triangle ABD$ 与 $\mathrm{Rt}\triangle ECA$ 中。`,
        gain: tex`得到两个以 $AD$、$AE$ 为斜边的直角三角形，$\angle ABD=\angle ECA=90^\circ$`,
      },
      {
        step: 2,
        title: "用“同角的余角相等”补齐第二组角",
        detail: tex`由 $\angle DAE=90^\circ$ 得 $\angle EAC+\angle DAB=90^\circ$，又 $\angle ADB+\angle DAB=90^\circ$，所以 $\angle ADB=\angle EAC$。`,
        gain: tex`$\triangle ABD\cong\triangle ECA$（AAS），于是 $AB=CE$、$BD=AC$`,
      },
    ],
    whyAux:
      "题目的四条线段 $AB$、$BD$、$AC$、$CE$ 分居在直线 $l$ 的两侧，彼此没有现成的对应关系。作垂线的作用是把 $AD$、$AE$ 变成两个直角三角形的斜边：直角提供了第一组等角，而 $\\angle DAE=90^\\circ$ 使 $\\angle ADB$ 与 $\\angle EAC$ 成为同一个角 $\\angle DAB$ 的余角，$AD=AE$ 又补上对应边，三个条件正好凑成 AAS。全等之后 $AB$ 与 $CE$、$BD$ 与 $AC$ 互换位置，$BC$ 就被自然拆成 $BD+CE$。",
    newRelations: [
      tex`$\triangle ABD\cong\triangle ECA$（AAS）`,
      tex`$AB=CE$，$BD=AC$`,
      tex`$BC=BA+AC=CE+BD$`,
      tex`$\angle ADB=\angle EAC$，$\angle DAB=\angle AEC$`,
      tex`$\triangle ADE$ 是等腰直角三角形，$\angle ADE=\angle AED=45^\circ$`,
      tex`当 $A$ 落在 $B$、$C$ 之间时 $BC=BD+CE$；当 $A$ 落在段外时 $BC=|BD-CE|$`,
    ],
    theorems: [
      "全等三角形判定：AAS（两角及其中一角的对边）",
      "同角的余角相等",
      "直角三角形两锐角互余",
      "等腰直角三角形的两腰相等、两个底角都是 $45^\\circ$",
      "线段的和差（点在线段上时）",
    ],
    proof: {
      goal: tex`已知 $B$、$A$、$C$ 共线，$DB\perp BC$，$EC\perp BC$，$\angle DAE=90^\circ$，$AD=AE$。求证 $\triangle ABD\cong\triangle ECA$，并求 $BC$ 与 $BD$、$CE$ 的关系。`,
      steps: [
        { s: tex`$\angle ABD=\angle ACE=90^\circ$`, r: "垂直的定义" },
        { s: tex`$\angle ADB+\angle DAB=90^\circ$`, r: "直角三角形两锐角互余" },
        {
          s: tex`$\angle EAC+\angle DAB=180^\circ-\angle DAE=90^\circ$`,
          r: "平角是 $180^\\circ$，且 $B$、$A$、$C$ 共线",
        },
        { s: tex`$\angle ADB=\angle EAC$`, r: "同角（$\\angle DAB$）的余角相等" },
        {
          s: tex`$\triangle ABD\cong\triangle ECA$`,
          r: tex`AAS：$\angle ABD=\angle ECA$，$\angle ADB=\angle EAC$，$AD=EA$`,
        },
        { s: tex`$AB=CE$，$BD=AC$`, r: "全等三角形的对应边相等" },
        {
          s: tex`$BC=BA+AC=CE+BD$`,
          r: tex`$A$ 在 $B$、$C$ 之间，线段相加`,
        },
      ],
      note: tex`三个直角中，中间那个角的顶点必须落在线段 $BC$ 上（即 $A$ 在 $B$、$C$ 之间），才有 $BC=BD+CE$；若 $A$ 落在线段 $BC$ 外，则 $BC=|BD-CE|$。另外 $AD=AE$ 不能漏，只有三个直角只能得到两个直角三角形有两组角相等，判定不了全等。`,
    },
    example: {
      problem:
        tex`如图，点 $B$、$A$、$C$ 在同一条直线上，$DB\perp BC$ 于 $B$，$EC\perp BC$ 于 $C$，$AD\perp AE$ 且 $AD=AE$。已知 $BD=5$，$CE=3$，求 $AB$、$AC$、$BC$ 的长。`,
      given: tex`$BD=5$，$CE=3$，$\angle DAE=90^\circ$，$AD=AE$。`,
      steps: [
        { s: tex`$\angle ABD=\angle ACE=90^\circ$`, r: "垂直的定义" },
        {
          s: tex`$\angle ADB=90^\circ-\angle DAB$，$\angle EAC=180^\circ-90^\circ-\angle DAB=90^\circ-\angle DAB$`,
          r: "直角三角形两锐角互余；平角减去 $\\angle DAE$",
        },
        { s: tex`$\angle ADB=\angle EAC$`, r: "等量代换" },
        {
          s: tex`$\triangle ABD\cong\triangle ECA$`,
          r: tex`AAS：$\angle ABD=\angle ECA$，$\angle ADB=\angle EAC$，$AD=EA$`,
        },
        { s: tex`$AB=CE=3$，$AC=BD=5$`, r: "全等三角形的对应边相等" },
        { s: tex`$BC=BA+AC=3+5=8$`, r: tex`$A$ 在 $B$、$C$ 之间，线段相加` },
      ],
      conclusion:
        tex`$AB=3$，$AC=5$，$BC=8$。注意对应关系：$AB$ 对应 $CE$、$BD$ 对应 $AC$，不要写成 $AB=BD$。`,
    },
    variants: [
      {
        title: "大等腰直角三角形 + 过直角顶点的直线",
        desc: tex`等腰直角 $\triangle ABC$ 中 $\angle BAC=90^\circ$、$AB=AC$，过 $A$ 任作直线 $l$，$BD\perp l$ 于 $D$、$CE\perp l$ 于 $E$，则 $\triangle ABD\cong\triangle CAE$，$BD=AE$、$AD=CE$，$DE=BD+CE$。`,
      },
      {
        title: "坐标系中的斜放直角",
        desc: tex`平面直角坐标系中，若 $AD\perp AE$ 且 $AD=AE$，可用 $AB=CE$、$BD=AC$ 把“斜线段”换成“横平竖直”的线段，从而由坐标求长度。`,
      },
      {
        title: "一线三垂直求面积",
        desc: tex`由全等得 $S_{\triangle ABD}=S_{\triangle ECA}$，所以 $S_{\triangle ABD}+S_{\triangle ACE}=\frac{1}{2}AB\cdot BD+\frac{1}{2}AC\cdot CE=BD\cdot CE$，可用于求被直线截出的两块面积之和。`,
      },
      {
        title: "一线三等角（把直角换成一般角）",
        desc: tex`把三个 $90^\circ$ 换成三个相等的锐角 $\alpha$，就得到一线三等角模型，此时一般只能得到两三角形有两组角对应相等，必须再加一组对应边相等才能全等。`,
      },
    ],
    pitfalls: [
      tex`把三个直角的位置记错：中间那个直角必须是 $\angle DAE=90^\circ$，它的顶点 $A$ 在直线 $l$ 上。`,
      tex`漏掉 $AD=AE$，只用三个直角就写全等：两组角相等判定不了全等（SSA、AA 都不行）。`,
      tex`$A$ 不在 $B$、$C$ 之间时仍写 $BC=BD+CE$：此时应为 $BC=|BD-CE|$。`,
      tex`对应关系写反：$AB$ 对应 $CE$、$BD$ 对应 $AC$，不是 $AB=BD$。`,
    ],
    related: ["one-line-three-angle", "iso-right-build", "handshake", "special-angle-rotate"],
    tags: ["全等", "一线三垂直", "K 字型", "AAS", "辅助线"],
  },
  {
    id: "one-line-three-angle",
    name: "一线三等角模型",
    alias: ["三等角模型", "同侧三等角"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: "一条直线上三个等角，第三个角自然相等；要全等，还差一组对应边。",
    summary:
      "同一直线上出现三个相等的角，可推出两个三角形有两组角对应相等，从而第三个角也相等；再补一组对应边，就能用 ASA 或 AAS 判定全等。",
    definition:
      tex`如图，点 $B$、$C$、$D$ 在同一条直线上，$A$、$E$ 在直线的同侧，且 $\angle ABC=\angle ACE=\angle CDE=\alpha$。由平角与三角形内角和可推出 $\angle BAC=\angle DCE$，于是 $\triangle ABC$ 与 $\triangle CDE$ 的三个角分别相等，对应关系是 $A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$。此时若再有一组对应边相等，如 $AB=CD$，则 $\triangle ABC\cong\triangle CDE$。图中画的是一般位置（三条边没有相等标记），所以只能得到角相等，不能直接写全等。`,
    conditions: [
      tex`一条直线上依次有三点 $B$、$C$、$D$`,
      tex`以这三点为顶点，在直线同侧各有一个相等的角：$\angle ABC=\angle ACE=\angle CDE=\alpha$`,
      tex`两个三角形分居中间顶点 $C$ 的两侧：$\triangle ABC$ 与 $\triangle CDE$`,
      "结论要求证明两个三角形全等，或要求线段相等",
      tex`还给出（或能推出）一组对应边相等：$AB=CD$，或 $BC=DE$，或 $AC=CE$`,
      tex`常见于 $60^\circ$、$90^\circ$、$120^\circ$ 等特殊角背景`,
    ],
    triggers: ["三点共线", "三个等角", "一线三等角", "同侧", "α", "对应边相等", "全等"],
    figure: "one-line-three-angle",
    auxSteps: [
      {
        step: 1,
        title: "标出三个等角，锁定待证的两个三角形",
        detail: tex`沿直线 $BD$ 找到中间顶点 $C$，把 $\angle ABC$、$\angle ACE$、$\angle CDE$ 都标成 $\alpha$，确认 $\triangle ABC$ 与 $\triangle CDE$ 是待证的一对。`,
        gain: tex`明确对应关系：$A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$`,
      },
      {
        step: 2,
        title: "借平角把“第三个角”挤出来",
        detail: tex`由 $B$、$C$、$D$ 共线得 $\angle ACB+\alpha+\angle DCE=180^\circ$；由 $\triangle ABC$ 内角和得 $\angle BAC=180^\circ-\alpha-\angle ACB$，两式比较即得 $\angle BAC=\angle DCE$。`,
        gain: "两组角对应相等，补一组对应边后即可用 ASA 或 AAS",
      },
    ],
    whyAux:
      "这类题往往不需要添新线，关键是“把三个等角摆到同一条直线上”。三个角相等之所以有用，是因为平角把中间那个角两侧的角联系了起来：$\\angle ACB+\\alpha+\\angle DCE=180^\\circ$，而三角形内角和又给出 $\\angle BAC+\\alpha+\\angle ACB=180^\\circ$，两式一比较，$\\angle BAC$ 与 $\\angle DCE$ 就被“挤”成相等。所以这里真正要做的是选对共线的三点、认清同侧的两个三角形；如果图形是斜的，常需要延长某条边把三点共线补出来。",
    newRelations: [
      tex`$\angle BAC=\angle DCE$（第三个角也相等）`,
      tex`$\triangle ABC$ 与 $\triangle CDE$ 的三个角分别相等（$A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$）`,
      tex`$\angle ACB+\angle DCE=180^\circ-\alpha$`,
      tex`若 $AB=CD$，则 $\triangle ABC\cong\triangle CDE$（ASA），且 $BC=DE$、$AC=CE$`,
      tex`若 $\alpha=90^\circ$，就退化为一线三垂直，此时还需 $AD=AE$ 一类的对应边条件`,
      tex`$\angle DCE=\angle BAC$ 与 $\alpha$ 的取值无关，换成 $120^\circ$ 等角同样成立`,
    ],
    theorems: [
      "三角形内角和定理",
      "平角等于 $180^\\circ$",
      "全等三角形判定：ASA（两角及其夹边）",
      "全等三角形判定：AAS（两角及其中一角的对边）",
      "等式的性质（等量代换）",
    ],
    proof: {
      goal: tex`已知 $B$、$C$、$D$ 共线，$\angle ABC=\angle ACE=\angle CDE=\alpha$，且 $AB=CD$。求证 $\triangle ABC\cong\triangle CDE$，$BC=DE$。`,
      steps: [
        {
          s: tex`$\angle ACB+\angle ACE+\angle DCE=180^\circ$`,
          r: tex`$B$、$C$、$D$ 共线，平角为 $180^\circ$`,
        },
        { s: tex`$\angle DCE=180^\circ-\alpha-\angle ACB$`, r: tex`代入 $\angle ACE=\alpha$` },
        {
          s: tex`$\angle BAC=180^\circ-\angle ABC-\angle ACB=180^\circ-\alpha-\angle ACB$`,
          r: "三角形内角和定理",
        },
        { s: tex`$\angle BAC=\angle DCE$`, r: "等量代换" },
        {
          s: tex`$\triangle ABC\cong\triangle CDE$`,
          r: tex`ASA：$\angle ABC=\angle CDE$，$AB=CD$，$\angle BAC=\angle DCE$`,
        },
        { s: tex`$BC=DE$，$AC=CE$`, r: "全等三角形的对应边相等" },
      ],
      note: tex`图中三个角相等，但三条边没有相等标记，这只是一般位置：三组角相等只能保证两个三角形形状相同，要写 $\cong$ 必须再补一组对应边。对应关系是 $A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$，所以对应边是 $AB\leftrightarrow CD$、$BC\leftrightarrow DE$、$AC\leftrightarrow CE$——$BC=CD$ 并不构成对应边相等。`,
    },
    example: {
      problem:
        tex`如图，$B$、$C$、$D$ 三点共线，$\angle ABC=\angle ACE=\angle CDE=\alpha$，$\angle ACB=\beta$。(1) 求 $\angle BAC$ 与 $\angle DCE$（用 $\alpha$、$\beta$ 表示）；(2) 说明再补什么条件可以判定 $\triangle ABC\cong\triangle CDE$。`,
      given: tex`$B$、$C$、$D$ 共线，$\angle ABC=\angle ACE=\angle CDE=\alpha$，$\angle ACB=\beta$。`,
      steps: [
        { s: tex`$\angle ACB+\angle ACE+\angle DCE=180^\circ$`, r: "平角" },
        { s: tex`$\angle DCE=180^\circ-\alpha-\beta$`, r: "代入已知角" },
        { s: tex`$\angle BAC=180^\circ-\angle ABC-\angle ACB=180^\circ-\alpha-\beta$`, r: "三角形内角和" },
        { s: tex`$\angle BAC=\angle DCE$`, r: "等量代换" },
        {
          s: tex`再给 $AB=CD$，则 $\triangle ABC\cong\triangle CDE$`,
          r: tex`ASA：两角（$\angle ABC=\angle CDE$，$\angle BAC=\angle DCE$）夹一边（$AB=CD$）`,
        },
      ],
      conclusion:
        tex`两个角都等于 $180^\circ-\alpha-\beta$。要判定全等，必须补一组**对应**边：$AB=CD$、$BC=DE$ 或 $AC=CE$ 中的任意一个；其中 $AB=CD$ 配合两组角组成 ASA，最常用。`,
    },
    variants: [
      {
        title: "一线三垂直（α=90°）",
        desc: tex`三个角都取 $90^\circ$ 时就是一线三垂直模型，此时常见的附加条件是 $AD=AE$ 或 $AB=AC$，结论是 $AB=CE$、$BD=AC$、$BC=BD+CE$。`,
      },
      {
        title: "等腰三角形中的三等角",
        desc: tex`在 $\triangle ABC$ 中 $AB=AC$，$D$ 在 $BC$ 上，$\angle ADE=\angle B$，$E$ 在 $AC$ 上，则 $\triangle ABD$ 与 $\triangle DCE$ 的三个角分别相等；若再给出 $BD=CE$（或 $AB=DC$），两者全等。`,
      },
      {
        title: "中点位置的三等角",
        desc: tex`若 $C$ 恰是 $BD$ 的中点，则 $BC=CD$，但它们不是对应边（$BC\leftrightarrow DE$），仍然不能判定全等，必须另找对应边。`,
      },
      {
        title: "120° 三等角",
        desc: tex`三个角都取 $120^\circ$ 时，平角推导仍然成立，$\angle BAC=\angle DCE$ 依旧是核心结论，只是 $\angle ACB+\angle DCE=60^\circ$。`,
      },
    ],
    pitfalls: [
      tex`看到三个等角就写 $\triangle ABC\cong\triangle CDE$：三组角相等只保证形状相同，必须有对应边相等。`,
      tex`对应关系搞错：$A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$，所以 $BC=CD$ 不是对应边相等。`,
      tex`忽略 $A$、$E$ 必须在直线同侧，否则平角关系变成互补，角的关系要重算。`,
      tex`把 $\angle ACB$ 与 $\angle DCE$ 的和写成 $180^\circ$：实际是 $\angle ACB+\angle DCE=180^\circ-\alpha$。`,
    ],
    related: ["one-line-three-perp", "rotation-congruence", "handshake", "similar-basic"],
    tags: ["全等", "一线三等角", "三点共线", "ASA", "对应边"],
  },
  {
    id: "brahmagupta",
    name: "婆罗摩笈多模型",
    alias: ["双正方形模型", "向外作正方形模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 3,
    mnemonic: "两边各长一个正方形，连两条斜线：等长又垂直；连两个外顶点，中线一半又垂直。",
    summary:
      "以三角形两边向外作正方形，两条“交叉线”相等且垂直；两个外侧顶点连线的中点与顶点的连线，垂直于第三边且等于第三边的一半，同时两个三角形面积相等。",
    definition:
      tex`如图，以 $\triangle ABC$ 的边 $AB$、$AC$ 为边向外作正方形 $ABDE$ 与正方形 $ACGF$（顶点顺序 $A\to B\to D\to E$、$A\to C\to F\to G$，两个正方形都在三角形外侧）。连接 $BG$、$CE$，则 $BG=CE$ 且 $BG\perp CE$；取 $EG$ 的中点 $M$，则 $AM\perp BC$ 且 $AM=\frac{1}{2}BC$；并且 $S_{\triangle AEG}=S_{\triangle ABC}$。图中 $H$ 是 $A$ 到 $BC$ 的垂足，$M$、$A$、$H$ 三点共线。`,
    conditions: [
      tex`以三角形的两条边分别向外作正方形，两个正方形共顶点 $A$`,
      "题目出现“以 $AB$、$AC$ 为边向外作正方形”的作图语言",
      tex`需要证明两条交叉线段相等且垂直（$BG=CE$，$BG\perp CE$）`,
      tex`给出（或需要证明）两个外侧顶点连线的中点 $M$`,
      tex`结论涉及 $AM$ 与第三边 $BC$ 的数量、位置关系，或两个三角形面积相等`,
      "常出现在压轴题、竞赛题中，是“旋转 $90^\\circ$ + 中线”的综合",
    ],
    triggers: ["向外作正方形", "共顶点", "BG=CE", "垂直", "中点", "面积相等", "旋转 90°"],
    figure: "brahmagupta",
    auxSteps: [
      {
        step: 1,
        title: "连两条交叉线 $BG$、$CE$",
        detail: tex`连接 $B$ 与 $G$、$C$ 与 $E$。$G$ 是正方形 $ACGF$ 中与 $A$ 相邻、满足 $AG\perp AC$ 且 $AG=AC$ 的顶点，$E$ 是正方形 $ABDE$ 中与 $A$ 相邻、满足 $AE\perp AB$ 且 $AE=AB$ 的顶点。`,
        gain: tex`得到 $\triangle ABG$ 与 $\triangle AEC$：它们有两组边相等（$AB=AE$、$AG=AC$），只差夹角`,
      },
      {
        step: 2,
        title: "取 $EG$ 中点 $M$，作 $AH\perp BC$",
        detail: tex`连接 $EG$ 并取其中点 $M$，连接 $AM$；过 $A$ 作 $AH\perp BC$ 于 $H$（$H$ 在 $BC$ 上）。`,
        gain: tex`把 $AM$ 与 $BC$ 的数量、位置关系摆到一起，可用倍长中线证 $AM=\frac{1}{2}BC$`,
      },
    ],
    whyAux:
      "两个正方形提供的都是“边长相等 + 直角”，但 $BG$ 与 $CE$ 分散在两个角落，必须先把它们连出来。连线的目的，是把 $AB$、$AG$ 与 $AE$、$AC$ 凑成一对三角形：$\\angle BAG=\\angle BAC+90^\\circ=\\angle EAC$，恰好是同一个角加上 $90^\\circ$，于是 SAS 成立，$BG$ 与 $CE$ 成为“绕 $A$ 旋转 $90^\\circ$ 的对应线段”，自然等长且垂直。取 $EG$ 中点 $M$ 则是为了把两个“远端”顶点 $E$、$G$ 的中点与 $A$ 相连：倍长 $AM$ 后得到的平行四边形与 $\\triangle ABC$ 全等，$AM$ 就被“搬”成 $BC$ 的一半。",
    newRelations: [
      tex`$\triangle ABG\cong\triangle AEC$（SAS），从而 $BG=CE$`,
      tex`$BG\perp CE$（对应线段的夹角等于旋转角 $90^\circ$）`,
      tex`$AM\perp BC$，且 $AM=\frac{1}{2}BC$`,
      tex`$S_{\triangle AEG}=S_{\triangle ABC}$`,
      tex`$\angle BAG=\angle EAC=\angle BAC+90^\circ$`,
      tex`$M$、$A$、$H$ 三点共线（$H$ 为 $A$ 到 $BC$ 的垂足）`,
    ],
    theorems: [
      "全等三角形判定：SAS",
      "旋转的性质：旋转前后图形全等，对应线段相等且夹角等于旋转角",
      "平行四边形的判定：对角线互相平分的四边形是平行四边形",
      "正方形的四条边相等、四个角都是直角",
      "两边夹角面积公式 $S=\\frac{1}{2}ab\\sin C$（或等底等高）",
    ],
    proof: {
      goal: tex`以 $\triangle ABC$ 的边 $AB$、$AC$ 向外作正方形 $ABDE$、$ACGF$，$M$ 为 $EG$ 中点，$H$ 为 $A$ 到 $BC$ 的垂足。求证 $BG=CE$、$BG\perp CE$、$AM\perp BC$、$AM=\frac{1}{2}BC$、$S_{\triangle AEG}=S_{\triangle ABC}$。`,
      steps: [
        {
          s: tex`$AB=AE$，$AG=AC$，$\angle BAG=\angle EAC=\angle BAC+90^\circ$`,
          r: tex`正方形四条边相等、四个角是直角；$\angle BAG=\angle BAC+\angle CAG$，$\angle EAC=\angle EAB+\angle BAC$`,
        },
        { s: tex`$\triangle ABG\cong\triangle AEC$`, r: "SAS" },
        {
          s: tex`$BG=CE$，且 $BG$ 与 $CE$ 的夹角为 $90^\circ$`,
          r: tex`全等对应边相等；$\triangle AEC$ 绕 $A$ 旋转 $90^\circ$ 恰好得到 $\triangle ABG$，旋转角为 $90^\circ$`,
        },
        {
          s: tex`延长 $AM$ 至 $M'$，使 $AM=MM'$，则四边形 $AEM'G$ 是平行四边形，$GM'\parallel AE$ 且 $GM'=AE=AB$`,
          r: "对角线 $AM'$ 与 $EG$ 互相平分，故为平行四边形；平行四边形对边平行且相等",
        },
        {
          s: tex`$\angle AGM'=180^\circ-\angle EAG=\angle BAC$`,
          r: tex`$GM'\parallel AE$，同旁内角互补；而 $\angle EAG=180^\circ-\angle BAC$（$AE\perp AB$、$AG\perp AC$）`,
        },
        {
          s: tex`$\triangle AGM'\cong\triangle CAB$（SAS），故 $AM'=CB$，$\angle M'AG=\angle ACB$`,
          r: tex`$AG=AC$，$GM'=AB$，$\angle AGM'=\angle BAC$`,
        },
        {
          s: tex`$AM=\frac{1}{2}AM'=\frac{1}{2}BC$；又 $\angle(AM,AC)=90^\circ+\angle ACB$，而直线 $AC$、$BC$ 的夹角等于 $\angle ACB$，故 $AM$ 与 $BC$ 的夹角为 $90^\circ$`,
          r: "线段中点定义；角的和差",
        },
        {
          s: tex`$S_{\triangle AEG}=\frac{1}{2}AE\cdot AG\cdot\sin\angle EAG=\frac{1}{2}AB\cdot AC\cdot\sin\angle BAC=S_{\triangle ABC}$`,
          r: tex`$AE=AB$、$AG=AC$，且 $\sin(180^\circ-\angle BAC)=\sin\angle BAC$`,
        },
      ],
      note: tex`证明只用到“正方形的边相等、角为直角”与 $\angle EAG=180^\circ-\angle BAC$，所以对任意三角形都成立；图中 $\angle BAC$ 画成锐角，若它是钝角，$BG=CE$、$AM\perp BC$、$AM=\frac{1}{2}BC$、$S_{\triangle AEG}=S_{\triangle ABC}$ 依然成立。若把正方形换成以 $AB$、$AC$ 为直角边的等腰直角三角形，整套结论同样成立。`,
    },
    example: {
      problem:
        tex`如图，以 $\triangle ABC$ 的边 $AB$、$AC$ 为边向外作正方形 $ABDE$、$ACGF$，连接 $BG$、$CE$，取 $EG$ 的中点 $M$。(1) 判断 $BG$ 与 $CE$ 的关系并说明理由；(2) 已知 $BC=5$，求 $AM$；(3) 已知 $S_{\triangle ABC}=6$，求 $S_{\triangle AEG}$。`,
      given: tex`$ABDE$、$ACGF$ 为正方形，$M$ 为 $EG$ 中点，$BC=5$，$S_{\triangle ABC}=6$。`,
      steps: [
        {
          s: tex`$AB=AE$，$AG=AC$，$\angle BAG=\angle EAC$`,
          r: tex`正方形性质；两边同加 $90^\circ$`,
        },
        { s: tex`$\triangle ABG\cong\triangle AEC$`, r: "SAS" },
        {
          s: tex`$BG=CE$ 且 $BG\perp CE$`,
          r: "全等对应边相等；对应线段夹角等于旋转角 $90^\\circ$",
        },
        {
          s: tex`$AM\perp BC$，$AM=\frac{1}{2}BC=\frac{5}{2}$`,
          r: "婆罗摩笈多结论（倍长 $AM$ 可证）",
        },
        {
          s: tex`$S_{\triangle AEG}=S_{\triangle ABC}=6$`,
          r: tex`$AE=AB$、$AG=AC$、$\angle EAG+\angle BAC=180^\circ$，两边夹角面积相等`,
        },
      ],
      conclusion:
        tex`$BG=CE$ 且 $BG\perp CE$；$AM=\frac{5}{2}$；$S_{\triangle AEG}=6$。三个结论分别来自“旋转全等”“倍长中线”“两边夹角面积”三条线索，是婆罗摩笈多模型的三件套。`,
    },
    variants: [
      {
        title: "向外作等腰直角三角形",
        desc: tex`把正方形换成以 $AB$、$AC$ 为直角边的等腰直角三角形，$BG=CE$、$BG\perp CE$、$AM\perp BC$、$AM=\frac{1}{2}BC$ 仍然成立，证明用的是同一套旋转 $90^\circ$。`,
      },
      {
        title: "与手拉手联动",
        desc: tex`婆罗摩笈多可以看成“两次旋转 $90^\circ$ 的手拉手”：正方形给出 $AB=AE$、$AG=AC$，两个等腰直角三角形共顶点 $A$，只是两腰互相垂直。`,
      },
      {
        title: "面积转化",
        desc: tex`由 $S_{\triangle AEG}=S_{\triangle ABC}$，可以把不规则四边形 $BCEG$ 的面积拆成两个正方形面积与三角形面积的和差，是“面积法”的常用跳板。`,
      },
    ],
    pitfalls: [
      tex`正方形顶点顺序写错：正方形 $ABDE$ 的边依次是 $AB$、$BD$、$DE$、$EA$，$E$ 与 $B$ 相对，不要写成 $ABEC$ 之类。`,
      "只证出 $BG=CE$ 就结束，漏掉“垂直”，或不知道垂直来自旋转角 $90^\\circ$。",
      tex`证 $AM=\frac{1}{2}BC$ 时只用眼睛看，不写倍长中线的过程，推理不完整。`,
      tex`把 $S_{\triangle AEG}=S_{\triangle ABC}$ 理解成“两个正方形面积相等”：两个正方形一般不相等，相等的是两个三角形。`,
    ],
    related: ["handshake", "rotation-congruence", "iso-right-build", "special-angle-rotate"],
    tags: ["全等", "正方形", "旋转", "中点", "面积"],
  },
  {
    id: "equilateral-build",
    name: "等边三角形构造模型",
    alias: ["120° 等腰造等边", "向外作等边三角形"],
    categories: ["congruence", "isosceles"],
    grade: "八年级上",
    difficulty: 2,
    importance: 4,
    mnemonic: "见 120° 就补等边：底边一作等边，顶角一分为二，腰长翻倍、还有直角。",
    summary:
      "遇到顶角 120° 的等腰三角形，以底边为边向外作等边三角形，可把 120° 拆成两个 60°，同时得到垂直、平分与 2 倍关系。",
    definition:
      tex`如图，$\triangle ABC$ 中 $CA=CB$，$\angle ACB=120^\circ$；以 $AB$ 为边在 $C$ 的另一侧作等边三角形 $ABD$，连接 $CD$ 交 $AB$ 于 $M$。则 $CD$ 垂直平分 $AB$，$\angle ACD=\angle BCD=60^\circ$，$\angle CAD=\angle CBD=90^\circ$，且 $CD=2CA=2CB$。`,
    conditions: [
      tex`出现顶角为 $120^\circ$ 的等腰三角形（两个底角各 $30^\circ$）`,
      "题目中有“以某边为边作等边三角形”的作图语言",
      tex`需要把 $120^\circ$ 拆成两个 $60^\circ$，或需要 $60^\circ$ 去凑直角三角形`,
      "结论涉及一条线段是另一条的两倍，或需要证明垂直、平分",
      tex`图形中出现 $30^\circ$、$60^\circ$、$90^\circ$ 的特殊角组合`,
    ],
    triggers: ["120°", "30°", "等边三角形", "向外作", "垂直平分", "2 倍", "特殊角"],
    figure: "equilateral-build",
    auxSteps: [
      {
        step: 1,
        title: "以底边 $AB$ 为边向外作等边三角形 $ABD$",
        detail: tex`使 $D$ 与 $C$ 分居 $AB$ 两侧，连接 $AD$、$BD$，则 $AD=BD=AB$，$\angle DAB=\angle DBA=60^\circ$。`,
        gain: tex`把 $120^\circ$ 的顶角与 $60^\circ$ 的等边三角形角拼在一起，为 $\angle CAD=90^\circ$ 做准备`,
      },
      {
        step: 2,
        title: "连接 $CD$，交 $AB$ 于 $M$",
        detail: tex`由 $CA=CB$、$DA=DB$ 知 $C$、$D$ 都在 $AB$ 的垂直平分线上，所以 $CD$ 就是 $AB$ 的垂直平分线；再由三线合一得 $\angle ACD=\angle BCD=60^\circ$。`,
        gain: tex`得到 $CD\perp AB$、$M$ 为 $AB$ 中点，以及 $\angle CAD=90^\circ$、$CD=2CA$`,
      },
    ],
    whyAux:
      "$120^\\circ$ 不是特殊角，但它是 $60^\\circ$ 的两倍：以 $AB$ 为边向外补一个等边三角形，相当于把 $120^\\circ$ 的角“劈”成两个 $60^\\circ$，同时把 $30^\\circ$ 的底角与 $60^\\circ$ 拼成 $90^\\circ$。背后的想法是：等边三角形自带 $60^\\circ$ 旋转，把它和 $120^\\circ$ 等腰放在一起时，$C$ 与 $D$ 关于 $AB$ 的垂直平分线对称，$CD$ 就同时是中线、高与角平分线，$2CA$ 的关系随之出现。",
    newRelations: [
      tex`$CD$ 垂直平分 $AB$（$M$ 为 $AB$ 中点，$CD\perp AB$）`,
      tex`$\angle ACD=\angle BCD=60^\circ$，$\angle CAD=\angle CBD=90^\circ$`,
      tex`$CD=2CA=2CB$`,
      tex`$\triangle ACD\cong\triangle BCD$（SSS）`,
      tex`若 $AB=a$，则 $CA=CB=\frac{\sqrt{3}}{3}a$，$CM=\frac{\sqrt{3}}{6}a$，$DM=\frac{\sqrt{3}}{2}a$，$CD=\frac{2\sqrt{3}}{3}a$`,
      tex`$S_{\triangle ABC}=\frac{\sqrt{3}}{12}a^2$，而 $S_{\triangle ABD}=\frac{\sqrt{3}}{4}a^2$`,
    ],
    theorems: [
      "等边三角形三边相等，三个角都是 $60^\\circ$",
      "等腰三角形三线合一",
      "线段垂直平分线的判定：到线段两端距离相等的点在这条线段的垂直平分线上",
      "全等三角形判定：SSS",
      "含 $30^\\circ$ 角的直角三角形中，$30^\\circ$ 所对的直角边等于斜边的一半",
    ],
    proof: {
      goal: tex`已知 $CA=CB$，$\angle ACB=120^\circ$，$\triangle ABD$ 是等边三角形且与 $C$ 分居 $AB$ 两侧。求证 $CD\perp AB$，$\angle ACD=60^\circ$，$CD=2CA$。`,
      steps: [
        { s: tex`$CA=CB$，$DA=DB$，$CD=CD$`, r: "已知与公共边" },
        { s: tex`$\triangle ACD\cong\triangle BCD$`, r: "SSS" },
        {
          s: tex`$\angle ACD=\angle BCD$，又 $\angle ACD+\angle BCD=120^\circ$，故各为 $60^\circ$`,
          r: "全等三角形对应角相等；角的和",
        },
        {
          s: tex`$CD\perp AB$，且 $M$ 为 $AB$ 中点`,
          r: tex`等腰 $\triangle CAB$ 中，顶角平分线、底边中线、底边高互相重合（三线合一）`,
        },
        {
          s: tex`$\angle CAB=\angle CBA=\frac{180^\circ-120^\circ}{2}=30^\circ$，$\angle DAB=60^\circ$，故 $\angle CAD=90^\circ$`,
          r: "等腰三角形两底角相等；等边三角形内角为 $60^\\circ$；角的和",
        },
        {
          s: tex`在 $\mathrm{Rt}\triangle ACD$ 中 $\angle ADC=180^\circ-90^\circ-60^\circ=30^\circ$，故 $AC=\frac{1}{2}CD$，即 $CD=2CA$`,
          r: "$30^\\circ$ 角所对的直角边等于斜边的一半",
        },
      ],
      note: tex`若 $D$ 与 $C$ 在 $AB$ 同侧，等边三角形就落在 $120^\circ$ 角内部：此时 $CD=CA$（不是 $2CA$），$\angle CAD=30^\circ$（不是 $90^\circ$）。所以“在 $C$ 的另一侧作”是必须写清的条件。`,
    },
    example: {
      problem:
        tex`如图，$\triangle ABC$ 中 $CA=CB$，$\angle ACB=120^\circ$，$AB=6$。以 $AB$ 为边在 $C$ 的另一侧作等边三角形 $ABD$，连接 $CD$ 交 $AB$ 于 $M$。求 $CA$、$CM$、$CD$ 与 $\angle ACD$。`,
      given: tex`$CA=CB$，$\angle ACB=120^\circ$，$AB=6$，$\triangle ABD$ 为等边三角形。`,
      steps: [
        { s: tex`$M$ 为 $AB$ 中点，$AM=3$`, r: "模型结论：$CD$ 垂直平分 $AB$" },
        { s: tex`$\angle ACM=60^\circ$`, r: "模型结论：$CD$ 平分 $120^\\circ$ 的顶角" },
        {
          s: tex`$\angle CAM=30^\circ$，在 $\mathrm{Rt}\triangle AMC$ 中 $CM=\frac{1}{2}CA$，$AM=\frac{\sqrt{3}}{2}CA$`,
          r: "等腰三角形底角为 $30^\\circ$；含 $30^\\circ$ 角的直角三角形三边关系",
        },
        { s: tex`$CA=\frac{AM}{\frac{\sqrt{3}}{2}}=2\sqrt{3}$`, r: "由上式解出" },
        { s: tex`$CM=\frac{1}{2}CA=\sqrt{3}$`, r: "$30^\\circ$ 所对的直角边等于斜边一半" },
        {
          s: tex`$DM=\frac{\sqrt{3}}{2}AB=3\sqrt{3}$，$CD=CM+DM=4\sqrt{3}=2CA$`,
          r: "等边三角形的高；线段相加",
        },
      ],
      conclusion: tex`$CA=2\sqrt{3}$，$CM=\sqrt{3}$，$CD=4\sqrt{3}$，$\angle ACD=60^\circ$，与 $CD=2CA$ 完全吻合。`,
    },
    variants: [
      {
        title: "两个等边三角形“背靠背”",
        desc: tex`若 $\triangle ABC$ 本身是等边三角形，以一边向外再作等边三角形，就得到背靠背模型：四边形是菱形，对角线互相垂直平分，出现 $120^\circ$。`,
      },
      {
        title: "双等边三角形手拉手",
        desc: tex`以 $AB$、$AC$ 为边分别向外作等边三角形，就得到两个共顶点 $A$ 的等边三角形，可用手拉手模型证线段相等，旋转角为 $60^\circ$。`,
      },
      {
        title: "同侧与异侧的对比",
        desc: tex`若 $D$ 与 $C$ 在 $AB$ 同侧，则 $CD=CA$、$\angle CAD=30^\circ$；与异侧时的 $CD=2CA$、$\angle CAD=90^\circ$ 完全不同，画图时必须先确定在哪一侧。`,
      },
      {
        title: "用 2 倍关系反求",
        desc: tex`已知 $CD$ 求 $CA$、$AB$：由 $CD=2CA$ 与 $CA=\frac{\sqrt{3}}{3}AB$ 可直接换算，避免再作辅助线。`,
      },
    ],
    pitfalls: [
      "漏写“在 $C$ 的另一侧”，把等边三角形作到了内部。",
      tex`把 $CD=2CA$ 记成 $CD=CA$：那是同侧的情形。`,
      tex`不先证 $CD$ 垂直平分 $AB$ 就用 $CM=\frac{1}{2}CA$。`,
      tex`把 $\angle CAD=90^\circ$ 当已知：它是由 $30^\circ+60^\circ$ 推出来的。`,
    ],
    related: ["back-to-back", "handshake", "special-angle-rotate"],
    tags: ["等边三角形", "120°", "等腰", "垂直平分", "2 倍"],
  },
  {
    id: "iso-right-build",
    name: "等腰直角三角形构造模型",
    alias: ["斜边中点模型", "90° 旋转构造"],
    categories: ["congruence", "isosceles"],
    grade: "八年级上",
    difficulty: 2,
    importance: 4,
    mnemonic: "等腰直角找中点：连中点，得垂直、得一半；过中点作十字，得旋转全等。",
    summary:
      "等腰直角三角形中，斜边中点与直角顶点的连线垂直平分斜边；过中点作两条互相垂直的线段交两腰，得到 90° 旋转全等，两条线段相等。",
    definition:
      tex`如图，$\triangle ABC$ 中 $\angle ACB=90^\circ$，$CA=CB$，$D$ 为斜边 $AB$ 的中点，连接 $CD$；过 $D$ 作 $DE\perp DF$，分别交 $CA$、$CB$ 于 $E$、$F$。则 $CD\perp AB$，$CD=AD=BD=\frac{1}{2}AB$，$\angle ACD=\angle BCD=45^\circ$，且 $\triangle CDE\cong\triangle BDF$，从而 $DE=DF$、$CE=BF$、$AE=CF$、$CE+CF=CA$。`,
    conditions: [
      tex`出现等腰直角三角形（$\angle C=90^\circ$，$CA=CB$）`,
      "已知斜边中点，或需要取斜边中点",
      "过斜边中点有两条互相垂直的线段，分别交两直角边",
      tex`结论涉及两条线段相等（$DE=DF$）或两段之和等于腰长（$CE+CF=CA$）`,
      "需要把 $45^\\circ$、$90^\\circ$ 或正方形、折叠背景转化为旋转全等",
      "需要用到“斜边中线等于斜边一半”",
    ],
    triggers: ["等腰直角三角形", "斜边中点", "垂直", "45°", "旋转 90°", "线段和", "斜边中线"],
    figure: "iso-right-build",
    auxSteps: [
      {
        step: 1,
        title: "连接直角顶点与斜边中点，得 $CD$",
        detail: tex`取 $AB$ 中点 $D$，连接 $CD$。由 $CA=CB$ 与三线合一得 $CD\perp AB$，$\angle ACD=\angle BCD=45^\circ$；又由斜边中线定理得 $CD=\frac{1}{2}AB=AD=BD$。`,
        gain: tex`得到 $CD=BD$、$\angle DCE=\angle DBF=45^\circ$、$\angle CDB=90^\circ$，为 SAS/ASA 备好条件`,
      },
      {
        step: 2,
        title: "过 $D$ 作 $DE\perp DF$，交两腰于 $E$、$F$",
        detail: tex`把 $\angle CDB=90^\circ$ 与 $\angle EDF=90^\circ$ 同时减去公共部分 $\angle EDB$，得 $\angle CDE=\angle BDF$。`,
        gain: tex`$\triangle CDE\cong\triangle BDF$（ASA），于是 $DE=DF$、$CE=BF$`,
      },
    ],
    whyAux:
      "等腰直角三角形里“信息最密”的点是斜边中点：它到三个顶点距离相等，还把直角分成两个 $45^\\circ$，因此天生适合做 $90^\\circ$ 旋转的中心。连 $CD$ 是为了得到 $CD=BD$ 与两个 $45^\\circ$；再让 $DE\\perp DF$，就把现成的直角 $\\angle CDB=90^\\circ$ 与 $\\angle EDF=90^\\circ$ 对齐，两个直角同时减去公共部分 $\\angle EDB$，剩下的 $\\angle CDE$ 与 $\\angle BDF$ 必然相等。于是 ASA 成立，$DE$ 与 $DF$ 成为绕 $D$ 旋转 $90^\\circ$ 的对应线段。",
    newRelations: [
      tex`$CD\perp AB$，$CD=AD=BD=\frac{1}{2}AB$`,
      tex`$\triangle CDE\cong\triangle BDF$（ASA）`,
      tex`$DE=DF$，且 $\angle EDF=90^\circ$，$\triangle DEF$ 是等腰直角三角形`,
      tex`$CE=BF$，$AE=CF$，$CE+CF=CA$`,
      tex`$\angle CDE=\angle BDF$，$\angle DEF=\angle DFE=45^\circ$`,
      tex`把 $\triangle CDE$ 绕 $D$ 旋转 $90^\circ$ 恰好得到 $\triangle BDF$`,
    ],
    theorems: [
      "等腰三角形三线合一",
      "直角三角形斜边中线等于斜边的一半",
      "全等三角形判定：ASA",
      "旋转的性质：旋转前后图形全等",
      "等腰直角三角形两个锐角都是 $45^\\circ$",
    ],
    proof: {
      goal: tex`已知 $\angle ACB=90^\circ$，$CA=CB$，$D$ 为 $AB$ 中点，$E$、$F$ 分别在 $CA$、$CB$ 上，且 $DE\perp DF$。求证 $DE=DF$，$CE+CF=CA$。`,
      steps: [
        {
          s: tex`$CD\perp AB$，$CD=BD=\frac{1}{2}AB$，$\angle ACD=\angle BCD=45^\circ$`,
          r: "等腰三角形三线合一；斜边中线定理",
        },
        {
          s: tex`$\angle CDB=90^\circ$，$\angle EDF=90^\circ$，故 $\angle CDE=\angle BDF$`,
          r: tex`$\angle CDE=90^\circ-\angle CDF$，$\angle BDF=90^\circ-\angle CDF$（同角的余角相等）`,
        },
        {
          s: tex`$\triangle CDE\cong\triangle BDF$`,
          r: tex`ASA：$\angle DCE=\angle DBF=45^\circ$，$CD=BD$，$\angle CDE=\angle BDF$`,
        },
        { s: tex`$DE=DF$，$CE=BF$`, r: "全等三角形的对应边相等" },
        { s: tex`$CE+CF=BF+CF=CB=CA$`, r: "等量代换与线段和" },
        { s: tex`$\triangle DEF$ 是等腰直角三角形`, r: tex`$DE=DF$ 且 $\angle EDF=90^\circ$` },
      ],
      note: tex`也可以用旋转解释：把 $\triangle CDE$ 绕 $D$ 旋转 $90^\circ$（方向使 $DC$ 落到 $DB$），$DE$ 随之落到 $DF$，两个三角形重合。用旋转说理时，必须交代旋转中心是 $D$、旋转角是 $90^\circ$。`,
    },
    example: {
      problem:
        tex`如图，$\angle ACB=90^\circ$，$CA=CB$，$D$ 为 $AB$ 中点，$E$、$F$ 分别在 $CA$、$CB$ 上，$CE=3$，$CF=4$，$DE\perp DF$。求 $CA$、$EF$ 与 $\triangle DEF$ 的面积。`,
      given: tex`$CE=3$，$CF=4$，$DE\perp DF$，$D$ 为斜边 $AB$ 中点。`,
      steps: [
        { s: tex`$DE=DF$，$CE=BF$`, r: "模型结论（$\\triangle CDE\\cong\\triangle BDF$，ASA）" },
        { s: tex`$BF=3$，$CB=CF+FB=4+3=7$，故 $CA=7$`, r: "等量代换；线段和" },
        { s: tex`在 $\mathrm{Rt}\triangle ECF$ 中 $EF=\sqrt{CE^2+CF^2}=\sqrt{9+16}=5$`, r: "勾股定理" },
        {
          s: tex`$\triangle DEF$ 是等腰直角三角形，$EF=\sqrt{2}\,DE$，故 $DE=\frac{5}{\sqrt{2}}=\frac{5\sqrt{2}}{2}$`,
          r: "等腰直角三角形三边比为 $1:1:\\sqrt{2}$",
        },
        {
          s: tex`$S_{\triangle DEF}=\frac{1}{2}DE\cdot DF=\frac{1}{2}\left(\frac{5\sqrt{2}}{2}\right)^2=\frac{25}{4}$`,
          r: "三角形面积公式；$DE=DF$",
        },
      ],
      conclusion: tex`$CA=7$，$EF=5$，$S_{\triangle DEF}=\frac{25}{4}$。其中 $EF$ 由 $\mathrm{Rt}\triangle ECF$ 直接算出，再借“等腰直角”把它与 $DE$、$DF$ 联系起来。`,
    },
    variants: [
      {
        title: "正方形中心的 90° 旋转",
        desc: tex`过正方形中心 $O$ 任作两条互相垂直的直线，它们被正方形截得的两条线段相等：因为绕 $O$ 旋转 $90^\circ$ 时正方形与自身重合，一条直线正好落到另一条上。`,
      },
      {
        title: "沿斜边翻折补成正方形",
        desc: tex`把等腰直角 $\triangle ABC$ 沿斜边 $AB$ 翻折，得到正方形 $ACBC'$，斜边中点 $D$ 就是正方形的中心，$90^\circ$ 旋转全等的结论可以直接搬进正方形里用。`,
      },
      {
        title: "斜边中线的一般形式",
        desc: tex`去掉 $CA=CB$，只保留 $\angle ACB=90^\circ$ 与中点 $D$，仍有 $CD=AD=BD=\frac{1}{2}AB$；但没有 $45^\circ$ 与 $CD\perp AB$，$DE=DF$ 不再成立。`,
      },
    ],
    pitfalls: [
      tex`把 $D$ 当成任意一点：必须是斜边中点，否则 $CD=BD$ 与 $45^\circ$ 都不成立。`,
      tex`证 $\angle CDE=\angle BDF$ 时只写“都是 $90^\circ$”，没写“同减 $\angle EDB$”。`,
      tex`由 $DE=DF$ 直接说 $\triangle DEF$ 是等腰直角三角形，漏掉 $\angle EDF=90^\circ$。`,
      tex`把 $CE=BF$ 写成 $CE=CF$：对应关系是 $C\leftrightarrow B$、$E\leftrightarrow F$，所以 $CE=BF$、$CF=AE$。`,
    ],
    related: ["hypotenuse-median", "rotation-congruence", "half-angle", "bisector-isosceles"],
    tags: ["等腰直角三角形", "斜边中线", "旋转", "ASA", "45°"],
  },
  {
    id: "half-angle",
    name: "半角模型",
    alias: ["45° 半角模型", "正方形半角模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 5,
    mnemonic: "正方形里 45° 角：转 90° 把短边搬到长边旁，两段拼成一段。",
    summary:
      "正方形（或等腰直角三角形）中，从顶点出发的 45° 角两边交两边，把其中一个三角形旋转 90°，可把两条短线段拼成一条，得到 EF=BE+DF。",
    definition:
      tex`如图，正方形 $ABCD$ 中，$E$ 在 $BC$ 上，$F$ 在 $CD$ 上，且 $\angle EAF=45^\circ$。把 $\triangle ABE$ 绕 $A$ 旋转 $90^\circ$（方向使 $AB$ 落到 $AD$），$E$ 落到 $DC$ 延长线上的 $G$（$DG=BE$）。则 $\triangle ABE\cong\triangle ADG$，$AE=AG$，$\angle EAG=90^\circ$；又 $\angle GAF=\angle EAF=45^\circ$，得 $\triangle AEF\cong\triangle AGF$，于是 $EF=GF=BE+DF$。`,
    conditions: [
      tex`出现正方形（或 $\angle BAD=90^\circ$ 且 $AB=AD$ 的图形）`,
      tex`从一个顶点出发的两条线段夹角等于 $90^\circ$ 的一半，即 $45^\circ$`,
      tex`这个 $45^\circ$ 角的两边分别交正方形的两条邻边`,
      tex`结论形如 $EF=BE+DF$ 的线段和，或要求 $\triangle CEF$ 的周长`,
      "需要证明角平分线（$AF$ 平分 $\\angle DFE$）或线段相等",
      "背景是正方形、等腰直角三角形、折叠",
    ],
    triggers: ["正方形", "45°", "半角", "线段和", "旋转 90°", "周长不变", "角平分线"],
    figure: "half-angle",
    auxSteps: [
      {
        step: 1,
        title: "在 $DC$ 的延长线上取 $G$，使 $DG=BE$",
        detail: tex`延长 $CD$ 到 $G$，使 $DG=BE$。这一步等价于把 $\triangle ABE$ 绕 $A$ 旋转 $90^\circ$，让 $AB$ 落到 $AD$ 上。`,
        gain: tex`得到 $AB=AD$、$\angle ABE=\angle ADG=90^\circ$、$BE=DG$，可用 SAS 证全等`,
      },
      {
        step: 2,
        title: "连接 $AG$、$GF$，证两次全等",
        detail: tex`由 $\triangle ABE\cong\triangle ADG$ 得 $AE=AG$、$\angle BAE=\angle DAG$，于是 $\angle EAG=\angle BAD=90^\circ$，$\angle GAF=90^\circ-45^\circ=45^\circ=\angle EAF$，再用 SAS 得 $\triangle AEF\cong\triangle AGF$。`,
        gain: tex`$EF=GF=GD+DF=BE+DF$，问题转化为一条线段`,
      },
    ],
    whyAux:
      "$45^\\circ$ 是 $90^\\circ$ 的一半，直接算 $EF$ 很别扭，因为 $EF$ 斜跨在两个三角形之间。把 $\\triangle ABE$ 绕 $A$ 旋转 $90^\\circ$ 后，$BE$ 被“搬”到 $DG$ 的位置，与 $DF$ 接在同一条直线 $DC$ 上，$BE+DF$ 就变成一条线段 $GF$；而 $AE=AG$、$\\angle EAF=\\angle GAF=45^\\circ$、$AF$ 公共，又保证 $EF=GF$。辅助线的作用就是“搬线段”：把要求的两段拼成一段，再用一次全等把它换成 $EF$。",
    newRelations: [
      tex`$\triangle ABE\cong\triangle ADG$（SAS）`,
      tex`$AE=AG$，$\angle EAG=90^\circ$，$\triangle AEG$ 是等腰直角三角形`,
      tex`$\triangle AEF\cong\triangle AGF$（SAS），$EF=GF$`,
      tex`$EF=BE+DF$`,
      tex`$\angle AFE=\angle AFD$（$AF$ 平分 $\angle DFE$），$\angle AEF=\angle AEB$（$AE$ 平分 $\angle BEF$）`,
      tex`$\triangle CEF$ 的周长 $=CE+CF+EF=BC+DC=2\cdot$ 边长`,
    ],
    theorems: [
      "全等三角形判定：SAS",
      "正方形的四条边相等、四个角都是 $90^\\circ$",
      "旋转的性质：旋转前后图形全等，对应线段相等",
      "同角的余角相等（或角的和差）",
      "勾股定理（用于在 $\\mathrm{Rt}\\triangle CEF$ 中列方程）",
    ],
    proof: {
      goal: tex`正方形 $ABCD$ 中，$E$ 在 $BC$ 上，$F$ 在 $CD$ 上，$\angle EAF=45^\circ$。求证 $EF=BE+DF$。`,
      steps: [
        {
          s: tex`在 $DC$ 的延长线上取 $G$，使 $DG=BE$，连接 $AG$、$GF$`,
          r: "作图（把 $\\triangle ABE$ 绕 $A$ 旋转 $90^\\circ$ 的落点）",
        },
        {
          s: tex`$\triangle ABE\cong\triangle ADG$`,
          r: tex`SAS：$AB=AD$，$\angle ABE=\angle ADG=90^\circ$，$BE=DG$`,
        },
        { s: tex`$AE=AG$，$\angle BAE=\angle DAG$`, r: "全等三角形的对应边、对应角" },
        {
          s: tex`$\angle EAG=\angle EAD+\angle DAG=\angle EAD+\angle BAE=\angle BAD=90^\circ$`,
          r: "角的和；正方形的内角为 $90^\\circ$",
        },
        { s: tex`$\angle GAF=\angle EAG-\angle EAF=90^\circ-45^\circ=45^\circ=\angle EAF$`, r: "角的差" },
        {
          s: tex`$\triangle AEF\cong\triangle AGF$`,
          r: tex`SAS：$AE=AG$，$\angle EAF=\angle GAF$，$AF=AF$`,
        },
        {
          s: tex`$EF=GF=GD+DF=BE+DF$`,
          r: tex`全等对应边相等；$G$、$D$、$F$ 依次在同一条直线上`,
        },
      ],
      note: tex`也可以“补短”：把 $\triangle ADF$ 绕 $A$ 旋转 $90^\circ$ 到 $\triangle ABG'$（$G'$ 在 $CB$ 的延长线上），同样得到 $EF=BE+DF$。关键是旋转角必须等于 $90^\circ$（即 $\angle BAD$），而 $\angle EAF$ 必须是它的一半。`,
    },
    example: {
      problem:
        tex`正方形 $ABCD$ 的边长为 $6$，$E$ 在 $BC$ 上，$F$ 在 $CD$ 上，$BE=2$，$\angle EAF=45^\circ$。求 $DF$ 与 $\triangle CEF$ 的周长。`,
      given: tex`边长 $6$，$BE=2$，$\angle EAF=45^\circ$。`,
      steps: [
        { s: tex`$EF=BE+DF=2+DF$`, r: "半角模型结论" },
        { s: tex`$CE=BC-BE=4$，$CF=CD-DF=6-DF$`, r: "线段差" },
        { s: tex`在 $\mathrm{Rt}\triangle CEF$ 中 $(2+DF)^2=4^2+(6-DF)^2$`, r: "勾股定理" },
        {
          s: tex`$4+4DF+DF^2=16+36-12DF+DF^2$，解得 $DF=3$`,
          r: "展开后移项、合并同类项",
        },
        { s: tex`$EF=2+3=5$，周长 $=4+3+5=12$`, r: "代入；周长定义" },
      ],
      conclusion:
        tex`$DF=3$，$\triangle CEF$ 的周长为 $12$，恰等于 $2\times6$，与“周长恒等于 $2$ 倍边长”的结论一致。`,
    },
    variants: [
      {
        title: "等腰直角三角形中的半角",
        desc: tex`在等腰直角 $\triangle ABC$ 中（$\angle BAC=90^\circ$，$AB=AC$），$E$、$F$ 在斜边 $BC$ 上，$\angle EAF=45^\circ$，则 $BE^2+CF^2=EF^2$：旋转 $90^\circ$ 后 $BE$ 与 $CF$ 成为同一个直角三角形的两条直角边。`,
      },
      {
        title: "周长不变",
        desc: tex`只要 $\angle EAF=45^\circ$，无论 $E$、$F$ 怎样移动，$\triangle CEF$ 的周长恒等于 $2$ 倍边长，这是半角模型最直观的“不变量”。`,
      },
      {
        title: "补短版本",
        desc: tex`把 $\triangle ADF$ 绕 $A$ 旋转 $90^\circ$ 到 $\triangle ABG'$，$G'$ 落在 $CB$ 的延长线上，同样得到 $EF=BE+DF$，这是“补短”的另一种画法。`,
      },
      {
        title: "三等分角",
        desc: tex`若把 $90^\circ$ 三等分成 $30^\circ+30^\circ+30^\circ$，旋转的思路仍可用，但结论不再是简单的线段和，需要按同样方法逐段拼接。`,
      },
    ],
    pitfalls: [
      tex`旋转方向搞反：必须让 $AB$ 转到 $AD$，$G$ 才落在 $DC$ 的延长线上。`,
      tex`漏证 $\angle GAF=45^\circ$，直接写 $\triangle AEF\cong\triangle AGF$。`,
      tex`把 $EF=BE+DF$ 用到非 $45^\circ$ 的角上：只有 $\angle EAF=\frac{1}{2}\angle BAD$ 时才成立。`,
      tex`在 $\mathrm{Rt}\triangle CEF$ 中用勾股时把 $CF$ 写成 $CD+DF$：$F$ 在 $CD$ 上，应为 $CD-DF$。`,
    ],
    related: ["iso-right-build", "rotation-congruence", "special-angle-rotate", "cut-patch"],
    tags: ["正方形", "半角", "45°", "线段和", "高频"],
  },
  {
    id: "rotation-congruence",
    name: "旋转全等模型",
    alias: ["旋转型全等", "绕定点旋转"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 2,
    importance: 5,
    mnemonic: "找中心、找旋转角、找对应点；转过去全等，转回来相等。",
    summary:
      "把一个三角形绕定点旋转一定角度得到另一个三角形，两者全等；反过来，有公共顶点、两组对应边相等且夹角相等的两个三角形，一定可以用旋转来解释。",
    definition:
      tex`如图，$\triangle ABC$ 与 $\triangle ADE$ 都是等边三角形，共顶点 $A$，$D$ 在 $BC$ 上，$E$ 在形外。把 $\triangle ABD$ 绕 $A$ 沿 $AB\to AC$ 的方向旋转 $60^\circ$：$AB$ 落到 $AC$ 上，$AD$ 落到 $AE$ 上，于是 $\triangle ABD\cong\triangle ACE$，$BD=CE$，$\angle ACE=\angle ABD=60^\circ$，$\angle ADB=\angle AEC$。一般地，只要 $AB=AC$、$AD=AE$、$\angle BAC=\angle DAE$（都等于旋转角），就有 $\triangle ABD\cong\triangle ACE$。`,
    conditions: [
      "两个三角形有一个公共顶点（旋转中心）",
      tex`从公共顶点出发的两组对应线段分别相等：$AB=AC$，$AD=AE$`,
      tex`两组线段的夹角相等，都等于旋转角：$\angle BAC=\angle DAE$`,
      tex`需要证明“跨在两个三角形之间”的线段相等（$BD=CE$）或求它们的夹角`,
      "图形具有旋转对称的背景：等边三角形、正方形、正多边形、共顶点的等腰三角形",
      "需要确定旋转中心或旋转角",
    ],
    triggers: ["共顶点", "旋转", "等边三角形", "正方形", "对应点", "旋转角", "BD=CE"],
    figure: "rotation-congruence",
    auxSteps: [
      {
        step: 1,
        title: "确定中心与旋转角，连接对应点",
        detail: tex`旋转中心是 $A$，旋转角是 $\angle BAC=60^\circ$；对应关系是 $B\leftrightarrow C$、$D\leftrightarrow E$。连接 $BD$、$CE$，它们就是一对对应线段。`,
        gain: tex`把旋转前后的对应线段画出来，$\triangle ABD$ 与 $\triangle ACE$ 成为待证的一对`,
      },
      {
        step: 2,
        title: "证 $\angle BAD=\angle CAE$，用 SAS 收尾",
        detail: tex`由 $\angle BAC=\angle DAE$，两边同时减去公共角 $\angle DAC$，得 $\angle BAD=\angle CAE$。`,
        gain: tex`$\triangle ABD\cong\triangle ACE$，$BD=CE$，且 $BD$ 与 $CE$ 的夹角等于旋转角 $60^\circ$`,
      },
    ],
    whyAux:
      "旋转全等的本质是“同一个运动的起点与终点”：$B$ 转到 $C$，$D$ 转到 $E$，那么 $BD$ 一定转到 $CE$，所以 $BD=CE$ 且它们的夹角等于旋转角。要把这件事写成证明，就得把“旋转”翻译成 SAS：两组对应边相等来自“旋转中心到对应点的距离不变”，夹角相等来自“旋转角相等”。连接对应点，正是为了把这两组条件装进同一对三角形里。",
    newRelations: [
      tex`$\triangle ABD\cong\triangle ACE$（SAS）`,
      tex`$BD=CE$，且 $BD$ 与 $CE$ 的夹角等于旋转角（图中为 $60^\circ$）`,
      tex`$\angle ABD=\angle ACE$，$\angle ADB=\angle AEC$`,
      tex`旋转中心到对应点的距离相等（$AB=AC$，$AD=AE$），对应点与中心连线的夹角都等于旋转角`,
      tex`旋转中心是两组对应点连线（$BC$ 与 $DE$）的垂直平分线的交点`,
      tex`若 $\angle BAC=60^\circ$ 且 $AB=AC$、$AD=AE$，则 $\triangle ABC$、$\triangle ADE$ 都是等边三角形，退化为手拉手`,
    ],
    theorems: [
      "旋转的性质：旋转前后图形全等；对应点到旋转中心的距离相等；对应点与旋转中心连线的夹角等于旋转角",
      "全等三角形判定：SAS",
      "等边三角形三边相等、三个角都是 $60^\\circ$",
      "线段垂直平分线的性质（用于确定旋转中心）",
      "三角形内角和定理（用于倒角）",
    ],
    proof: {
      goal: tex`已知 $\triangle ABC$、$\triangle ADE$ 都是等边三角形，共顶点 $A$，$D$ 在 $BC$ 上。求证 $\triangle ABD\cong\triangle ACE$，$BD=CE$，$\angle ACE=60^\circ$。`,
      steps: [
        { s: tex`$AB=AC$，$AD=AE$`, r: "等边三角形三边相等" },
        {
          s: tex`$\angle BAD=\angle BAC-\angle DAC$，$\angle CAE=\angle DAE-\angle DAC$`,
          r: "角的差（$D$ 在 $\\angle BAC$ 内部，$E$ 在 $AC$ 的另一侧）",
        },
        { s: tex`$\angle BAD=\angle CAE$`, r: "等量代换（$\\angle BAC=\\angle DAE=60^\\circ$）" },
        { s: tex`$\triangle ABD\cong\triangle ACE$`, r: "SAS" },
        { s: tex`$BD=CE$，$\angle ACE=\angle ABD$`, r: "全等三角形的对应边、对应角" },
        { s: tex`$\angle ABD=\angle ABC=60^\circ$，故 $\angle ACE=60^\circ$`, r: "等边三角形内角为 $60^\\circ$；等量代换" },
      ],
      note: tex`旋转方向必须交代清楚：本题是把 $\triangle ABD$ 绕 $A$ 沿 $AB\to AC$ 的方向旋转 $60^\circ$ 得到 $\triangle ACE$。若把方向说反，$D$ 会落到 $AE$ 的另一侧，对应关系随之改变，$BD=CE$ 也不再成立。`,
    },
    example: {
      problem:
        tex`如图，$\triangle ABC$ 是等边三角形，$D$ 在 $BC$ 上，以 $AD$ 为边在形外作等边三角形 $ADE$，连接 $CE$。已知 $BD=3$，求 $CE$ 与 $\angle DCE$。`,
      given: tex`等边 $\triangle ABC$、等边 $\triangle ADE$，$D$ 在 $BC$ 上，$BD=3$。`,
      steps: [
        { s: tex`$AB=AC$，$AD=AE$，$\angle BAC=\angle DAE=60^\circ$`, r: "等边三角形性质" },
        { s: tex`$\angle BAD=\angle CAE$`, r: "两边同减 $\\angle DAC$" },
        { s: tex`$\triangle ABD\cong\triangle ACE$`, r: "SAS" },
        { s: tex`$CE=BD=3$`, r: "全等三角形的对应边相等" },
        { s: tex`$\angle ACE=\angle ABD=60^\circ$`, r: "全等对应角；等边三角形内角" },
        {
          s: tex`$\angle DCE=\angle DCA+\angle ACE=60^\circ+60^\circ=120^\circ$`,
          r: tex`$D$ 在 $BC$ 上，故 $\angle DCA=\angle BCA=60^\circ$；角的和`,
        },
      ],
      conclusion: tex`$CE=3$，$\angle DCE=120^\circ$。第 6 步的 $120^\circ$ 来自“$60^\circ+60^\circ$”，不是看图量出来的。`,
    },
    variants: [
      {
        title: "正方形中的旋转 90°",
        desc: tex`两个正方形 $ABCD$、$CEFG$ 共顶点 $C$，连接 $BG$、$DE$，则 $BG=DE$ 且 $BG\perp DE$，旋转角为 $90^\circ$。`,
      },
      {
        title: "旋转中心未知时怎么找",
        desc: tex`只给两组对应点 $B\to C$、$D\to E$ 时，旋转中心是 $BC$ 与 $DE$ 的垂直平分线的交点；旋转角等于这两条“对应点连线”所夹的角，也等于 $\angle BAC$。`,
      },
      {
        title: "旋转 120°",
        desc: tex`正六边形或顶角 $120^\circ$ 的等腰三角形背景，旋转角为 $120^\circ$，对应线段的夹角也是 $120^\circ$。`,
      },
      {
        title: "与手拉手的区别",
        desc: tex`手拉手是“两个等腰三角形共顶角顶点且顶角相等”的特例；旋转全等更一般，只要有两组等距线段与相等的夹角，就能构造出旋转全等，不一定非得是等腰三角形。`,
      },
    ],
    pitfalls: [
      tex`把旋转角写成 $\angle BAD$：旋转角是 $\angle BAC$（对应点与中心连线的夹角），$\angle BAD$ 是三角形内角。`,
      tex`对应关系弄错：$B\leftrightarrow C$、$D\leftrightarrow E$，所以对应边是 $BD\leftrightarrow CE$、$AB\leftrightarrow AC$、$AD\leftrightarrow AE$。`,
      "只有两组边相等就写全等（SSA）：必须夹角相等。",
      "用旋转性质时不说旋转中心和旋转角，过程不完整。",
    ],
    related: ["handshake", "special-angle-rotate", "half-angle", "iso-right-build"],
    tags: ["旋转", "全等", "SAS", "对应点", "旋转角"],
  },
  {
    id: "cut-patch",
    name: "截长补短模型",
    alias: ["截长补短", "线段和差模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: "要证 a=b+c：长线段上截一段，或短线段上接一段；全等一证，和差自现。",
    summary:
      "当结论是两条线段之和等于第三条线段时，在长线段上截取一段等于短线段（截长），或把短线段延长（补短），用全等把分散的线段拼到同一直线上。",
    definition:
      tex`如图，在 $\triangle ABC$ 中，$\angle B=60^\circ$，$\angle C=30^\circ$，$AD$ 平分 $\angle BAC$ 交 $BC$ 于 $D$。在 $AC$ 上截取 $AF=AB$，连接 $DF$，则 $\triangle ABD\cong\triangle AFD$，$BD=DF$，$\angle AFD=\angle B=60^\circ$；又 $\angle DFC=120^\circ$、$\angle C=30^\circ$，得 $\angle FDC=30^\circ=\angle C$，所以 $DF=FC$。于是 $AC=AF+FC=AB+BD$。`,
    conditions: [
      tex`结论是线段的和差：$a=b+c$（或 $a-b=c$）`,
      "图中有一条明显更长的线段，需要在其上取点，或需要延长某条线段",
      tex`有角平分线、等腰三角形、$60^\circ$/$30^\circ$ 等能产生全等的条件`,
      tex`已知两角满足 $\angle B=2\angle C$ 一类的倍数关系（图中 $60^\circ=2\times30^\circ$）`,
      "直接计算有困难，需要把两条线段“拼”到一条直线上比较",
      tex`结论中出现“求证 $AC=AB+BD$”这类形式`,
    ],
    triggers: ["线段和", "a=b+c", "截长", "补短", "角平分线", "线段差", "60° 与 30°"],
    figure: "cut-patch",
    auxSteps: [
      {
        step: 1,
        title: "在长线段 $AC$ 上截取 $AF=AB$，连接 $DF$",
        detail: tex`在 $AC$ 上取点 $F$，使 $AF=AB$，连接 $DF$。由 $AD$ 平分 $\angle BAC$ 得 $\angle BAD=\angle FAD$，加上公共边 $AD$，构成 SAS。`,
        gain: tex`$\triangle ABD\cong\triangle AFD$，于是 $BD=DF$，$\angle AFD=\angle B=60^\circ$`,
      },
      {
        step: 2,
        title: "把“剩下的一段”接到 $BD$ 上",
        detail: tex`由 $\angle AFD=60^\circ$ 得 $\angle DFC=120^\circ$；在 $\triangle DFC$ 中 $\angle C=30^\circ$，所以 $\angle FDC=30^\circ=\angle C$，得 $DF=FC$。`,
        gain: tex`$FC=DF=BD$，从而 $AC=AF+FC=AB+BD$`,
      },
    ],
    whyAux:
      "结论要证的是“两段之和等于第三段”，可 $AB$、$BD$、$AC$ 分居在不同三角形里，没法直接相加。截长的做法是在长线段 $AC$ 上切下 $AF=AB$，把 $AB$ “搬”到 $AC$ 上，再用角平分线提供的一组等角与公共边 $AD$ 造出全等，把 $BD$ 也搬成 $DF$。这样 $AB$ 与 $BD$ 就都站在直线 $AC$ 上了，只要证 $DF=FC$，和式自然成立。补短的思路相反：把 $AB$ 延长一段等于 $BD$，再证整体等于 $AC$。",
    newRelations: [
      tex`$\triangle ABD\cong\triangle AFD$（SAS）`,
      tex`$BD=DF$，$\angle AFD=\angle B$`,
      tex`$DF=FC$（$\triangle DFC$ 是等腰三角形）`,
      tex`$AC=AB+BD$`,
      tex`$\angle DFC=180^\circ-\angle B$，$\angle FDC=\angle C$`,
      tex`一般地，若 $\angle B=2\angle C$ 且 $AD$ 平分 $\angle BAC$，则 $AC=AB+BD$ 恒成立`,
    ],
    theorems: [
      "全等三角形判定：SAS",
      "等腰三角形的判定：等角对等边",
      "三角形内角和定理",
      "角平分线的定义",
      "平角与角的和差",
    ],
    proof: {
      goal: tex`已知 $\triangle ABC$ 中 $\angle B=2\angle C$，$AD$ 平分 $\angle BAC$ 交 $BC$ 于 $D$。求证 $AC=AB+BD$。`,
      steps: [
        { s: tex`在 $AC$ 上取点 $F$，使 $AF=AB$，连接 $DF$`, r: "截长作图" },
        { s: tex`$\angle BAD=\angle FAD$`, r: "角平分线的定义" },
        {
          s: tex`$\triangle ABD\cong\triangle AFD$`,
          r: tex`SAS：$AB=AF$，$\angle BAD=\angle FAD$，$AD=AD$`,
        },
        { s: tex`$BD=DF$，$\angle AFD=\angle B$`, r: "全等三角形的对应边、对应角" },
        {
          s: tex`$\angle DFC=180^\circ-\angle AFD=180^\circ-\angle B$`,
          r: tex`$F$ 在 $AC$ 上，$\angle AFD$ 与 $\angle DFC$ 互补`,
        },
        {
          s: tex`$\angle FDC=180^\circ-\angle DFC-\angle C=180^\circ-(180^\circ-\angle B)-\angle C=\angle B-\angle C=\angle C$`,
          r: "三角形内角和；$\\angle B=2\\angle C$",
        },
        { s: tex`$DF=FC$，故 $AC=AF+FC=AB+BD$`, r: "等角对等边；线段和" },
      ],
      note: tex`本题的通用条件是 $\angle B=2\angle C$，图中 $60^\circ$ 与 $30^\circ$ 只是它的一组具体取值。若把 $60^\circ$、$30^\circ$ 换掉而 $\angle B\ne2\angle C$，则 $\angle FDC=\angle C$ 推不出来，$DF=FC$ 与 $AC=AB+BD$ 也一并失效。`,
    },
    example: {
      problem:
        tex`如图，在 $\triangle ABC$ 中，$\angle B=60^\circ$，$\angle C=30^\circ$，$AD$ 平分 $\angle BAC$ 交 $BC$ 于 $D$，$AB=10$。(1) 求证 $AC=AB+BD$；(2) 求 $BD$ 与 $CD$。`,
      given: tex`$\angle B=60^\circ$，$\angle C=30^\circ$，$AB=10$，$AD$ 平分 $\angle BAC$。`,
      steps: [
        { s: tex`$\angle BAC=180^\circ-60^\circ-30^\circ=90^\circ$`, r: "三角形内角和" },
        {
          s: tex`在 $AC$ 上取 $F$ 使 $AF=AB=10$，连接 $DF$，则 $\triangle ABD\cong\triangle AFD$`,
          r: "SAS（角平分线 + 公共边）",
        },
        {
          s: tex`$BD=DF$，$\angle AFD=\angle B=60^\circ$，故 $\angle DFC=120^\circ$`,
          r: "全等对应；平角",
        },
        {
          s: tex`$\angle FDC=180^\circ-120^\circ-30^\circ=30^\circ=\angle C$，故 $DF=FC$`,
          r: "三角形内角和；等角对等边",
        },
        { s: tex`$AC=AF+FC=10+BD$，即 $AC=AB+BD$`, r: "线段和；等量代换" },
        {
          s: tex`在 $\mathrm{Rt}\triangle ABC$ 中 $\angle C=30^\circ$，故 $AB=\frac{1}{2}BC$，$BC=20$，$AC=10\sqrt{3}$`,
          r: "$30^\\circ$ 所对的直角边等于斜边一半；勾股定理",
        },
        {
          s: tex`$BD=AC-AB=10\sqrt{3}-10$，$CD=BC-BD=30-10\sqrt{3}$`,
          r: "由 (1) 与线段差",
        },
      ],
      conclusion:
        tex`$AC=10\sqrt{3}$，$BD=10(\sqrt{3}-1)$，$CD=30-10\sqrt{3}$。可验算 $BD+CD=20=BC$，与图形一致。`,
    },
    variants: [
      {
        title: "补短版本",
        desc: tex`延长 $AB$ 到 $E$，使 $BE=BD$，连接 $DE$：由 $BE=BD$ 得 $\angle BED=\angle BDE=30^\circ=\angle C$，再用 AAS 证 $\triangle AED\cong\triangle ACD$，得 $AC=AE=AB+BD$。`,
      },
      {
        title: "两段之差",
        desc: tex`若结论是 $a-b=c$，就在长线段上截去 $b$，证余下部分等于 $c$，思路与截长完全一致，只是把“相加”换成“相减”。`,
      },
      {
        title: "60° 与 30° 的其他取值",
        desc: tex`只要 $\angle B=2\angle C$，具体度数可以换成 $90^\circ$ 与 $45^\circ$、$120^\circ$ 与 $60^\circ$，$AC=AB+BD$ 仍成立。`,
      },
      {
        title: "与半角模型的关系",
        desc: tex`半角模型中的 $EF=BE+DF$ 也是线段和，只是用旋转把两段拼起来；截长补短用“截/接”达到同样目的，两者可以互相替代。`,
      },
    ],
    pitfalls: [
      tex`截长时截错端点：要在长线段 $AC$ 上截 $AF=AB$（从 $A$ 量起），不能从 $C$ 量起。`,
      tex`不证 $DF=FC$ 就直接写 $AC=AB+BD$：中间必须用“等角对等边”补上这一步。`,
      tex`把 $\angle DFC$ 当成 $\angle AFD$ 的余角：它们互补，和为 $180^\circ$。`,
      tex`忘记 $\angle B=2\angle C$ 这个倍数条件，导致 $\angle FDC=\angle C$ 推不出来。`,
    ],
    related: ["half-angle", "bisector-congruence", "double-segment", "segment-sum-transform"],
    tags: ["全等", "截长补短", "线段和差", "角平分线", "SAS"],
  },
  {
    id: "double-segment",
    name: "倍长线段模型",
    alias: ["倍长中线", "中心对称全等", "8 字型全等"],
    categories: ["congruence", "midpoint"],
    grade: "八年级上",
    difficulty: 1,
    importance: 5,
    mnemonic: "见中点、倍长它；一转 180°，线段搬家、平行出现。",
    summary:
      "把经过中点的线段延长一倍，得到一对中心对称的全等三角形（8 字型），从而把线段搬到别处，得到相等与平行。",
    definition:
      tex`如图，$O$ 是 $AB$ 的中点，$C$ 是直线 $AB$ 外一点，延长 $CO$ 到 $D$ 使 $OD=CO$，连接 $BD$。则 $\triangle AOC\cong\triangle BOD$，于是 $AC=BD$ 且 $AC\parallel BD$；四边形 $ACBD$ 的对角线 $AB$、$CD$ 互相平分，所以它是平行四边形。图中 $AB=CD$ 且 $AB\perp CD$，此时 $ACBD$ 还是正方形。`,
    conditions: [
      tex`图中有线段的中点（$O$ 为 $AB$ 中点）`,
      tex`有一条线段经过这个中点（如 $CO$ 经过 $O$）`,
      "需要把一条线段“搬家”，或需要证明两条线段相等、平行",
      "结论涉及平行四边形、中线，或“两条线段之和/差”的转化",
      "图形呈“8 字型”：两条线段相交于中点",
    ],
    triggers: ["中点", "倍长", "8 字型", "中心对称", "平行四边形", "线段转移", "中线"],
    figure: "double-segment",
    auxSteps: [
      {
        step: 1,
        title: "延长过中点的线段，使延长部分等于原线段",
        detail: tex`延长 $CO$ 到 $D$，使 $OD=CO$，连接 $BD$（也可连接 $AD$，得到另一对全等三角形）。`,
        gain: tex`得到 $\triangle AOC$ 与 $\triangle BOD$，它们有 $AO=BO$、$\angle AOC=\angle BOD$、$CO=DO$`,
      },
      {
        step: 2,
        title: "用 SAS 得全等，读出平行",
        detail: tex`由 $\triangle AOC\cong\triangle BOD$ 得 $AC=BD$、$\angle CAO=\angle DBO$；这两个角是直线 $AC$、$BD$ 被 $AB$ 所截的内错角。`,
        gain: tex`$AC$ 被“搬”成 $BD$ 且方向平行，四边形 $ACBD$ 成为平行四边形`,
      },
    ],
    whyAux:
      "中点只说明 $AO=BO$，本身不产生全等。把 $CO$ 延长一倍，等于让 $\\triangle AOC$ 绕 $O$ 旋转 $180^\\circ$：$A$ 转到 $B$，$C$ 转到 $D$，两个三角形完全重合。旋转 $180^\\circ$（中心对称）既保长度又保方向，所以不只得到 $AC=BD$，还得到 $AC\\parallel BD$。这正是“倍长”的价值：把一条线段搬到对面的同时，顺手造出平行线，为平行四边形、中位线、中线取值范围等问题铺路。",
    newRelations: [
      tex`$\triangle AOC\cong\triangle BOD$（SAS）`,
      tex`$AC=BD$ 且 $AC\parallel BD$`,
      tex`四边形 $ACBD$ 是平行四边形（对角线 $AB$、$CD$ 互相平分）`,
      tex`若 $\angle AOC=90^\circ$，则 $ACBD$ 是菱形（对角线互相垂直平分）`,
      tex`若再有 $AB=CD$，则 $ACBD$ 是正方形`,
      tex`$CD=2CO$，$AB=2AO$`,
    ],
    theorems: [
      "全等三角形判定：SAS",
      "对顶角相等",
      "平行线的判定：内错角相等，两直线平行",
      "平行四边形的判定：对角线互相平分的四边形是平行四边形",
      "菱形的判定：对角线互相垂直的平行四边形是菱形",
    ],
    proof: {
      goal: tex`$O$ 为 $AB$ 中点，$C$ 为直线 $AB$ 外一点，延长 $CO$ 到 $D$ 使 $OD=CO$。求证 $AC=BD$ 且 $AC\parallel BD$。`,
      steps: [
        { s: tex`$AO=BO$`, r: "$O$ 为 $AB$ 中点" },
        { s: tex`$\angle AOC=\angle BOD$`, r: "对顶角相等" },
        { s: tex`$CO=DO$`, r: "作图" },
        { s: tex`$\triangle AOC\cong\triangle BOD$`, r: "SAS" },
        { s: tex`$AC=BD$`, r: "全等三角形的对应边相等" },
        { s: tex`$\angle CAO=\angle DBO$`, r: "全等三角形的对应角相等" },
        {
          s: tex`$AC\parallel BD$`,
          r: tex`$\angle CAO$ 与 $\angle DBO$ 是内错角，内错角相等则两直线平行`,
        },
      ],
      note: tex`倍长的对象必须是“经过中点的线段”。若把一条与中点无关的线段延长一倍，得不到中心对称，也就没有全等。“倍长中线”只是本模型的特例：把 $\triangle ABC$ 的中线 $AD$ 延长一倍得到 $ABEC$ 是平行四边形。`,
    },
    example: {
      problem:
        tex`如图，四边形 $ACBD$ 的对角线 $AB$、$CD$ 相交于点 $O$，且 $OA=OB$，$OC=OD$。求证 $AC\parallel BD$ 且 $AC=BD$。`,
      given: tex`$OA=OB$，$OC=OD$，$AB$ 与 $CD$ 交于 $O$。`,
      steps: [
        { s: tex`$\angle AOC=\angle BOD$`, r: "对顶角相等" },
        {
          s: tex`$\triangle AOC\cong\triangle BOD$`,
          r: tex`SAS：$OA=OB$，$\angle AOC=\angle BOD$，$OC=OD$`,
        },
        { s: tex`$AC=BD$，$\angle CAO=\angle DBO$`, r: "全等三角形的对应边、对应角" },
        { s: tex`$AC\parallel BD$`, r: "内错角相等，两直线平行" },
        {
          s: tex`四边形 $ACBD$ 是平行四边形`,
          r: "对角线互相平分的四边形是平行四边形（也可用“一组对边平行且相等”）",
        },
      ],
      conclusion:
        tex`两条结论都成立。本题说明：“对角线互相平分”可以直接翻译成“倍长线段模型”——$\triangle AOC$ 与 $\triangle BOD$ 就是绕 $O$ 旋转 $180^\circ$ 的一对。`,
    },
    variants: [
      {
        title: "倍长中线",
        desc: tex`在 $\triangle ABC$ 中，$D$ 为 $BC$ 中点，延长 $AD$ 到 $E$ 使 $DE=AD$，则 $BE=AC$、$BE\parallel AC$，$ABEC$ 是平行四边形；由此可证 $AB+AC>2AD$，并得 $\frac{1}{2}|AB-AC|<AD<\frac{1}{2}(AB+AC)$。`,
      },
      {
        title: "证中位线定理",
        desc: tex`$D$、$E$ 分别是 $AB$、$AC$ 的中点，延长 $DE$ 到 $F$ 使 $EF=DE$，由 $\triangle ADE\cong\triangle CFE$ 得 $CF\parallel AD$ 且 $CF=AD=BD$，于是 $BCFD$ 是平行四边形，从而 $DE\parallel BC$、$DE=\frac{1}{2}BC$。`,
      },
      {
        title: "中点四边形",
        desc: tex`依次连接任意四边形各边的中点，所得四边形是平行四边形：用两次倍长（或中位线）即可证明，这是倍长线段模型的组合应用。`,
      },
      {
        title: "求线段的取值范围",
        desc: tex`倍长后把分散的线段集中到一个三角形里，用三边关系求范围：如 $AB=5$、$AC=3$、$D$ 为 $BC$ 中点时，$1<AD<4$。`,
      },
    ],
    pitfalls: [
      tex`只延长不连接：倍长后必须连接 $BD$（或 $AD$），否则没有三角形可用。`,
      tex`把 $AC=BD$ 与 $AC\parallel BD$ 混为一谈：相等来自全等对应边，平行来自内错角。`,
      tex`写 $\triangle AOC\cong\triangle BOD$ 时把对应顶点写错：$A\leftrightarrow B$、$C\leftrightarrow D$、$O\leftrightarrow O$。`,
      "把任意线段延长一倍就套用结论：必须是经过中点的线段（或中线）。",
    ],
    related: ["double-median", "midline", "butterfly-x", "midpoint-congruence"],
    tags: ["中点", "倍长", "中心对称", "全等", "平行四边形"],
  },
  {
    id: "opposite-angle-supplement",
    name: "对角互补模型",
    alias: ["对角互补加邻边相等", "旋转补形"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 3,
    mnemonic: "对角互补、邻边相等；绕顶点一转，两段接成一段，角平分线现身。",
    summary:
      "四边形中一组对角互补且一组邻边相等时，把其中一个三角形绕公共顶点旋转，可使另三点共线，从而得到角平分线与线段和。",
    definition:
      tex`如图，四边形 $ABCD$ 中 $\angle BAD+\angle BCD=180^\circ$，且 $AB=AD$（图中 $\angle BAD=120^\circ$、$\angle BCD=60^\circ$）。把 $\triangle ABC$ 绕 $A$ 旋转 $\angle BAD$，使 $AB$ 落到 $AD$ 上，$C$ 落到 $C'$。则 $\triangle ABC\cong\triangle ADC'$，$BC=DC'$；由四边形内角和得 $\angle ABC+\angle ADC=180^\circ$，故 $\angle ADC'+\angle ADC=180^\circ$，所以 $C'$、$D$、$C$ 三点共线，$CC'=C'D+DC=BC+CD$。并且 $AC=AC'$，$\triangle ACC'$ 是顶角为 $\angle BAD$ 的等腰三角形，$CA$ 平分 $\angle BCD$。`,
    conditions: [
      tex`四边形中有一组对角互补：$\angle BAD+\angle BCD=180^\circ$`,
      tex`这组对角中，以同一个顶点为端点的两条邻边相等：$AB=AD$`,
      tex`需要证明某条对角线平分一个角（$CA$ 平分 $\angle BCD$）`,
      tex`结论涉及两条线段之和（$CB+CD$）与对角线（$AC$）的关系`,
      tex`出现 $60^\circ$、$90^\circ$、$120^\circ$ 等特殊角`,
      "图形中有“旋转后可以重合”的两条相等邻边",
    ],
    triggers: ["对角互补", "邻边相等", "旋转", "三点共线", "角平分线", "线段和", "60°/120°"],
    figure: "opposite-angle-supplement",
    auxSteps: [
      {
        step: 1,
        title: "把 $\\triangle ABC$ 绕 $A$ 旋转到 $\\triangle ADC'$",
        detail: tex`以 $A$ 为旋转中心，按 $\angle BAD$ 的方向旋转，使 $AB$ 落到 $AD$ 上（$AB=AD$ 保证做得到），$C$ 落到 $C'$；连接 $AC'$、$DC'$。`,
        gain: tex`$\triangle ABC\cong\triangle ADC'$，$AC'=AC$，$DC'=BC$，$\angle ADC'=\angle ABC$`,
      },
      {
        step: 2,
        title: "连接 $CC'$，证 $C'$、$D$、$C$ 三点共线",
        detail: tex`由四边形内角和 $360^\circ$ 与已知的互补关系得 $\angle ABC+\angle ADC=180^\circ$，所以 $\angle ADC'+\angle ADC=180^\circ$，$C'$、$D$、$C$ 在一条直线上，$CC'=C'D+DC$。`,
        gain: tex`$BC+CD=CC'$，且 $\triangle ACC'$ 是顶角为 $\angle BAD$ 的等腰三角形`,
      },
    ],
    whyAux:
      "已知条件把“$AB=AD$”和“对角互补”分放在四边形的两处，单看哪一个都不够用。绕 $A$ 旋转 $\\angle BAD$ 后，$AB$ 与 $AD$ 重合，$\\triangle ABC$ 被搬到 $\\triangle ADC'$，于是 $BC$ 变成 $DC'$，与 $CD$ 落在同一条直线上；而“对角互补”正好保证 $\\angle ADC'$ 与 $\\angle ADC$ 拼成 $180^\\circ$，三点共线。共线之后，$BC+CD$ 被压缩成一条线段 $CC'$，它又是等腰三角形 $ACC'$ 的底边，长度只取决于 $AC$ 与顶角，问题就此解完。",
    newRelations: [
      tex`$\triangle ABC\cong\triangle ADC'$（旋转全等）`,
      tex`$C'$、$D$、$C$ 三点共线，$CC'=BC+CD$`,
      tex`$AC=AC'$，$\angle CAC'=\angle BAD$，$\triangle ACC'$ 是等腰三角形`,
      tex`$CA$ 平分 $\angle BCD$，即 $\angle ACB=\angle ACD$`,
      tex`$\angle BAD=120^\circ$ 时 $CB+CD=\sqrt{3}\,AC$；$\angle BAD=90^\circ$ 时 $CB+CD=\sqrt{2}\,AC$；$\angle BAD=60^\circ$ 时 $CB+CD=AC$`,
      tex`$S_{ABCD}=S_{\triangle ACC'}=\frac{1}{2}AC^2\sin\angle BAD$；当 $\angle BAD=120^\circ$ 时 $S_{ABCD}=\frac{\sqrt{3}}{4}AC^2$`,
    ],
    theorems: [
      "四边形内角和等于 $360^\\circ$",
      "旋转的性质：旋转前后图形全等",
      "等腰三角形的性质：等边对等角，三线合一",
      "含 $30^\\circ$ 角的直角三角形三边比为 $1:\\sqrt{3}:2$",
      "平角与三点共线的判定",
    ],
    proof: {
      goal: tex`四边形 $ABCD$ 中 $\angle BAD+\angle BCD=180^\circ$，$AB=AD$，且 $\angle BAD=120^\circ$。求证 $CA$ 平分 $\angle BCD$，且 $CB+CD=\sqrt{3}\,AC$。`,
      steps: [
        { s: tex`把 $\triangle ABC$ 绕 $A$ 旋转 $\angle BAD$ 到 $\triangle ADC'$`, r: tex`作图：$AB=AD$，旋转后 $B$ 与 $D$ 重合` },
        {
          s: tex`$AC'=AC$，$DC'=BC$，$\angle ADC'=\angle ABC$，$\angle AC'D=\angle ACB$`,
          r: "旋转前后图形全等，对应边、对应角相等",
        },
        {
          s: tex`$\angle ABC+\angle ADC=360^\circ-(\angle BAD+\angle BCD)=180^\circ$`,
          r: "四边形内角和为 $360^\\circ$，已知一组对角互补",
        },
        {
          s: tex`$\angle ADC'+\angle ADC=\angle ABC+\angle ADC=180^\circ$，故 $C'$、$D$、$C$ 三点共线`,
          r: "等量代换；两角互补则两射线成一条直线",
        },
        { s: tex`$CC'=C'D+DC=BC+CD$`, r: "线段和" },
        {
          s: tex`在等腰 $\triangle ACC'$ 中 $AC=AC'$，$\angle CAC'=120^\circ$，作底边上的高得 $CC'=2\cdot AC\cdot\sin60^\circ=\sqrt{3}\,AC$`,
          r: "等腰三角形三线合一；含 $30^\\circ$ 角的直角三角形三边比 $1:\\sqrt{3}:2$",
        },
        {
          s: tex`$\angle AC'D=\angle ACB$，又 $C'$、$D$、$C$ 共线且 $AC=AC'$，故 $\angle AC'C=\angle ACC'$，于是 $\angle ACB=\angle ACD$`,
          r: "等边对等角；角的代换",
        },
      ],
      note: tex`旋转的方向与角度必须与 $\angle BAD$ 一致；若 $AB\ne AD$，$B$ 旋转后落不到 $D$ 上，整套构造失效。另外“对角互补”是四点共圆的等价条件，学过圆之后可以用“同弧所对的圆周角相等”重新解释这个模型。`,
    },
    example: {
      problem:
        tex`如图，四边形 $ABCD$ 中 $\angle BAD+\angle BCD=180^\circ$，$AB=AD$，$\angle BCD=60^\circ$，$AC=4$。求 $CB+CD$ 与 $\angle ACB$。`,
      given: tex`$AB=AD$，$\angle BAD$ 与 $\angle BCD$ 互补，$\angle BCD=60^\circ$，$AC=4$。`,
      steps: [
        { s: tex`$\angle BAD=180^\circ-60^\circ=120^\circ$`, r: "互补的定义" },
        {
          s: tex`把 $\triangle ABC$ 绕 $A$ 旋转 $120^\circ$ 到 $\triangle ADC'$，则 $C'$、$D$、$C$ 三点共线`,
          r: "模型构造：旋转 $\\angle BAD$ 后对角互补保证共线",
        },
        { s: tex`$CC'=CB+CD$，$AC'=AC=4$，$\angle CAC'=120^\circ$`, r: "模型结论" },
        {
          s: tex`在等腰 $\triangle ACC'$ 中作底边上的高，$CC'=2\times4\times\sin60^\circ=4\sqrt{3}$`,
          r: "三线合一；含 $30^\\circ$ 角的直角三角形",
        },
        { s: tex`$\angle ACB=\angle ACD=\frac{1}{2}\angle BCD=30^\circ$`, r: "$CA$ 平分 $\\angle BCD$" },
      ],
      conclusion: tex`$CB+CD=4\sqrt{3}$，$\angle ACB=30^\circ$。注意 $4\sqrt{3}<4+4$，与三角形两边之和大于第三边不矛盾。`,
    },
    variants: [
      {
        title: "对角互补 + 90°",
        desc: tex`若 $\angle BAD=90^\circ$（此时 $\angle BCD=90^\circ$）且 $AB=AD$，则 $CB+CD=\sqrt{2}\,AC$，且 $CA$ 平分 $\angle BCD$。`,
      },
      {
        title: "对角互补 + 60°",
        desc: tex`若 $\angle BAD=60^\circ$、$\angle BCD=120^\circ$，则 $CB+CD=AC$，此时 $\triangle ACC'$ 是等边三角形。`,
      },
      {
        title: "面积结论",
        desc: tex`四边形面积等于 $\triangle ACC'$ 的面积，即 $S=\frac{1}{2}AC^2\sin\angle BAD$；在 $\angle BAD=120^\circ$ 时 $S=\frac{\sqrt{3}}{4}AC^2$，可用于求面积或建立方程。`,
      },
    ],
    pitfalls: [
      tex`把“对角互补”写成“邻角互补”：互补的是 $\angle BAD$ 与 $\angle BCD$，它们不相邻。`,
      tex`漏掉 $AB=AD$：没有这组邻边相等，$B$ 旋转后落不到 $D$ 上。`,
      tex`旋转后不证三点共线就写 $CC'=CB+CD$。`,
      tex`把 $CB+CD=\sqrt{3}\,AC$ 用到任意对角互补的四边形上：$\sqrt{3}$ 只在 $\angle BAD=120^\circ$ 时成立。`,
    ],
    related: ["half-angle", "rotation-congruence", "special-angle-rotate", "handshake"],
    tags: ["对角互补", "旋转", "角平分线", "线段和", "特殊角"],
  },
  {
    id: "special-angle-rotate",
    name: "特殊角旋转模型",
    alias: ["费马点旋转", "60° 旋转聚线段"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: "等边三角形里一点，绕顶点转 60°；三条线段凑成一个三角形。",
    summary:
      "在等边三角形（或含 60°、90° 的特殊图形）中，把一个三角形绕顶点旋转特殊角，可把三条分散的线段聚成同一个三角形的三边，从而求角或证不等式。",
    definition:
      tex`如图，$\triangle ABC$ 是等边三角形，$P$ 是形内一点。把 $\triangle ABP$ 绕 $A$ 沿 $AB\to AC$ 的方向旋转 $60^\circ$ 得到 $\triangle ACP'$，则 $AP'=AP$、$\angle PAP'=60^\circ$，$\triangle APP'$ 是等边三角形，$PP'=AP$；又 $BP=CP'$。于是 $PA$、$PB$、$PC$ 恰好是 $\triangle PCP'$ 的三边：$PP'=PA$、$P'C=PB$、$PC$ 不变。`,
    conditions: [
      tex`图形中有等边三角形，或含 $60^\circ$、$90^\circ$、$120^\circ$ 的特殊角`,
      tex`一点 $P$ 与三个顶点相连，形成 $PA$、$PB$、$PC$ 三条线段`,
      tex`需要求 $PA$、$PB$、$PC$ 之间的角度关系，或证明关于它们的不等式`,
      "需要把三条分散的线段“聚”到同一个三角形中",
      tex`题目出现“求 $\angle APB$”“求 $PA+PB+PC$ 的最小值”等问法`,
    ],
    triggers: ["等边三角形", "形内一点", "旋转 60°", "三条线段", "费马点", "求角", "线段和"],
    figure: "special-angle-rotate",
    auxSteps: [
      {
        step: 1,
        title: "把 $\\triangle ABP$ 绕 $A$ 旋转 $60^\\circ$",
        detail: tex`以 $A$ 为旋转中心，沿 $AB\to AC$ 的方向旋转 $60^\circ$：$B$ 落到 $C$，$P$ 落到 $P'$；连接 $AP'$、$PP'$、$P'C$。`,
        gain: tex`$\triangle ABP\cong\triangle ACP'$，$AP'=AP$，$BP=CP'$，$\angle PAP'=60^\circ$`,
      },
      {
        step: 2,
        title: "读出 $\\triangle APP'$ 与 $\\triangle PCP'$",
        detail: tex`$AP=AP'$ 且 $\angle PAP'=60^\circ$，所以 $\triangle APP'$ 是等边三角形，$PP'=AP$；于是 $\triangle PCP'$ 的三边正好是 $PA$、$PB$、$PC$。`,
        gain: "把“三条线段”的问题转化为“一个三角形”的问题",
      },
    ],
    whyAux:
      "$PA$、$PB$、$PC$ 都从 $P$ 出发，彼此没有直接关系，无法比较。旋转 $60^\\circ$ 的作用是“搬运”：$PB$ 被搬到 $P'C$，$PA$ 被搬到 $PP'$，三条线段于是首尾相接，围成 $\\triangle PCP'$。为什么非选 $60^\\circ$？因为等边三角形中 $AB$ 与 $AC$ 的夹角就是 $60^\\circ$，只有转 $60^\\circ$ 才能让 $B$ 精确落到 $C$ 上；转其他角度，$B$ 的像不在 $C$，就凑不出封闭三角形。",
    newRelations: [
      tex`$\triangle ABP\cong\triangle ACP'$（SAS）`,
      tex`$\triangle APP'$ 是等边三角形：$AP=PP'=AP'$，$\angle AP'P=\angle APP'=60^\circ$`,
      tex`$BP=CP'$，$\angle APB=\angle AP'C$`,
      tex`$PA$、$PB$、$PC$ 是 $\triangle PCP'$ 的三边，故 $|PB-PC|<PA<PB+PC$`,
      tex`$\angle APB=60^\circ+\angle PP'C$（$P$ 在形内时），所以 $\angle APB>60^\circ$`,
      tex`若 $PA:PB:PC=3:4:5$，则 $\angle PP'C=90^\circ$，$\angle APB=150^\circ$`,
    ],
    theorems: [
      "旋转的性质：旋转前后图形全等，对应点到旋转中心的距离相等",
      "全等三角形判定：SAS",
      "等边三角形的判定：有一个角是 $60^\\circ$ 的等腰三角形是等边三角形",
      "三角形三边关系：任意两边之和大于第三边",
      "勾股定理的逆定理（由三边判断直角三角形）",
    ],
    proof: {
      goal: tex`等边 $\triangle ABC$ 内一点 $P$，把 $\triangle ABP$ 绕 $A$ 旋转 $60^\circ$ 得到 $\triangle ACP'$。求证 $\triangle APP'$ 是等边三角形，$BP=CP'$，且 $PA$、$PB$、$PC$ 是 $\triangle PCP'$ 的三边。`,
      steps: [
        { s: tex`$AP=AP'$`, r: "旋转中心到对应点的距离相等" },
        { s: tex`$\angle PAP'=60^\circ$`, r: "旋转角为 $60^\\circ$" },
        {
          s: tex`$\triangle APP'$ 是等边三角形，$PP'=AP$`,
          r: "有一个角是 $60^\\circ$ 的等腰三角形是等边三角形",
        },
        {
          s: tex`$AB=AC$，$AP=AP'$，$\angle BAP=\angle CAP'$`,
          r: "等边三角形三边相等；$B$、$P$ 的像分别是 $C$、$P'$",
        },
        { s: tex`$\triangle ABP\cong\triangle ACP'$`, r: "SAS" },
        { s: tex`$BP=CP'$，$\angle APB=\angle AP'C$`, r: "全等三角形的对应边、对应角" },
        { s: tex`$\triangle PCP'$ 的三边为 $PC$、$CP'=PB$、$PP'=PA$`, r: "线段代换" },
      ],
      note: tex`旋转方向很关键：沿 $AB\to AC$ 的方向转，$B$ 才落到 $C$；反方向转 $60^\circ$ 时 $B$ 会落到形外的 $B'$，那时得到的是“求 $PA+PB+PC$ 最小值”的另一套构造（见变式）。`,
    },
    example: {
      problem: tex`如图，$P$ 是等边三角形 $ABC$ 内一点，$PA=3$，$PB=4$，$PC=5$。求 $\angle APB$ 的度数。`,
      given: tex`$\triangle ABC$ 为等边三角形，$P$ 在形内，$PA=3$，$PB=4$，$PC=5$。`,
      steps: [
        {
          s: tex`把 $\triangle ABP$ 绕 $A$ 旋转 $60^\circ$ 到 $\triangle ACP'$，则 $AP'=3$，$PP'=3$，$CP'=BP=4$`,
          r: "模型构造：$\\triangle APP'$ 为等边三角形，$BP=CP'$",
        },
        {
          s: tex`在 $\triangle PCP'$ 中 $PP'=3$、$P'C=4$、$PC=5$，而 $3^2+4^2=5^2$`,
          r: "勾股定理的逆定理",
        },
        { s: tex`$\angle PP'C=90^\circ$`, r: "勾股定理的逆定理：$PC$ 为斜边" },
        { s: tex`$\angle AP'P=60^\circ$`, r: "$\\triangle APP'$ 是等边三角形" },
        {
          s: tex`$\angle AP'C=\angle AP'P+\angle PP'C=60^\circ+90^\circ=150^\circ$`,
          r: "角的和（$P'P$ 落在 $\\angle AP'C$ 内部）",
        },
        { s: tex`$\angle APB=\angle AP'C=150^\circ$`, r: "全等三角形的对应角相等" },
      ],
      conclusion:
        tex`$\angle APB=150^\circ$。通用套路是：先用旋转把三条线段拼成一个三角形，再由这个三角形的形状（直角、等边等）读出角度，最后把角搬回 $\angle APB$。`,
    },
    variants: [
      {
        title: "求 $PA+PB+PC$ 的最小值",
        desc: tex`若把 $B$ 旋转到 $AB$ 外侧的 $B'$（旋转方向取反），则 $PA+PB+PC=PP'+P'B'+PC\ge CB'$，当 $C$、$P$、$P'$、$B'$ 共线时取最小值 $CB'$，此时的 $P$ 就是费马点。`,
      },
      {
        title: "正方形中的 90° 版本",
        desc: tex`把等边三角形换成正方形（旋转角 $90^\circ$），旋转后 $\triangle APP'$ 成为等腰直角三角形，$PP'=\sqrt{2}\,PA$，同样能把几条线段“聚”成一个三角形，只是特殊角要换成 $45^\circ$、$90^\circ$。`,
      },
      {
        title: "求另外两个角",
        desc: tex`同一构造还能求 $\angle BPC$、$\angle APC$：把 $\triangle BPC$ 绕 $B$ 旋转 $60^\circ$，或把 $\triangle APC$ 绕 $C$ 旋转 $60^\circ$，分别得到它们与某个三角形形状的对应关系。`,
      },
      {
        title: "三线段的不等关系",
        desc: tex`由 $\triangle PCP'$ 的三边关系直接得到 $|PB-PC|<PA<PB+PC$，这类不等式题不需要任何具体数值。`,
      },
    ],
    pitfalls: [
      tex`旋转方向搞反：必须让 $B$ 落到 $C$，否则 $BP$ 与 $CP'$ 的对应关系不成立。`,
      tex`把 $\angle AP'C$ 直接当成 $\angle APB$：要先由 $\triangle ABP\cong\triangle ACP'$ 得到对应角相等。`,
      tex`忽略 $P$ 必须在形内：$P$ 跑到形外时，$\angle AP'C=60^\circ+\angle PP'C$ 的和会变成差。`,
      tex`用 $3,4,5$ 判定直角时张冠李戴：$5$ 是最大边，$PC$ 对的才是 $\angle PP'C$。`,
    ],
    related: ["rotation-congruence", "handshake", "equilateral-build", "brahmagupta"],
    tags: ["旋转", "等边三角形", "费马点", "聚线段", "勾股逆定理"],
  },
];
