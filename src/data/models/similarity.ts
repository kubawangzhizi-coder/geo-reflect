import type { ModelCard } from "../types";

const tex = String.raw;

export const SIMILARITY_MODELS: ModelCard[] = [
  {
    id: "similar-basic",
    name: "相似三角形判定与性质（相似基础）",
    alias: ["相似基本模型", "相似三角形预备定理"],
    categories: ["similarity"],
    grade: "九年级上",
    difficulty: 2,
    importance: 5,
    mnemonic: tex`角对角写、边对边比；两角相等定相似，一个 $k$ 管周长，$k^{2}$ 管面积。`,
    summary: tex`两个三角形的对应角分别相等、对应边成比例，就说这两个三角形相似。相似把“形状”和“大小”分开：形状由角决定，大小由相似比 $k$ 决定。它是相似一章的总纲，属于八、九年级衔接的拓展内容，八年级同学可以先记住“角相等、边成比例”这句话，等学完相似判定再回头补证明。`,
    definition: tex`如图，在 $\triangle ABC$ 与 $\triangle DEF$ 中，若 $\angle A=\angle D$、$\angle B=\angle E$、$\angle C=\angle F$，且 $\frac{AB}{DE}=\frac{BC}{EF}=\frac{CA}{FD}=k$，就说 $\triangle ABC$ 相似于 $\triangle DEF$，记作 $\triangle ABC\sim\triangle DEF$。记号中字母的先后顺序就是对应关系：$A\leftrightarrow D$、$B\leftrightarrow E$、$C\leftrightarrow F$。$k$ 叫相似比；$k=1$ 时两个三角形全等，所以全等是相似的特例，相似是全等的推广。`,
    conditions: [
      tex`两个三角形形状相同：三组对应角分别相等`,
      tex`三组对应边成比例，且比的顺序与顶点顺序一致`,
      tex`判定最常用的一条：两角分别相等的两个三角形相似（AA）`,
      tex`或者三边成比例，或者两边成比例且夹角相等`,
      tex`图中存在“平行于三角形一边的直线截其他两边”（预备定理）`,
      tex`题目要求线段比、周长比、面积比，或要求证明两个三角形相似`,
    ],
    triggers: [
      tex`对应角相等`,
      tex`对应边成比例`,
      tex`相似比`,
      tex`平行截两边`,
      tex`两角分别相等`,
      tex`周长比`,
      tex`面积比`,
    ],
    figure: "similar-basic",
    auxSteps: [
      {
        step: 1,
        title: tex`把两个三角形叠到一起`,
        detail: tex`在 $DE$ 上截取 $DM=AB$，过 $M$ 作 $MN\parallel EF$ 交 $DF$ 于 $N$。这相当于把 $\triangle ABC$ 挪进 $\angle D$ 里，让 $AB$ 与 $DM$ 重合。`,
        gain: tex`得到 $\triangle DMN$，它与 $\triangle ABC$ 全等，又与 $\triangle DEF$ 共顶点 $D$、共边 $DF$`,
      },
      {
        step: 2,
        title: tex`用全等搬动三条边`,
        detail: tex`由 $MN\parallel EF$ 得 $\angle DMN=\angle E=\angle B$；又 $\angle D=\angle A$、$DM=AB$，用 ASA 得 $\triangle DMN\cong\triangle ABC$。`,
        gain: tex`$MN=BC$、$DN=AC$，把 $\triangle ABC$ 的三条边搬进了 $\triangle DEF$`,
      },
      {
        step: 3,
        title: tex`用平行线分线段成比例收尾`,
        detail: tex`在 $\triangle DEF$ 中 $MN\parallel EF$，得 $\frac{DM}{DE}=\frac{DN}{DF}=\frac{MN}{EF}$，再把 $DM$、$DN$、$MN$ 换回 $AB$、$AC$、$BC$。`,
        gain: tex`得到 $\frac{AB}{DE}=\frac{AC}{DF}=\frac{BC}{EF}$，对应边成比例证完`,
      },
    ],
    whyAux: tex`相似的定义只讲了“形状相同”，不能直接量。把 $\triangle ABC$ 搬进 $\triangle DEF$、让一组对应边重合，问题就变成了“平行线截两边”：全等负责搬边，平行线负责出比例。这正是相似判定“预备定理”的证明思路，也是后面 A 字、8 字模型的共同来源。`,
    newRelations: [
      tex`$\triangle ABC\sim\triangle DEF$，且 $\angle A=\angle D$、$\angle B=\angle E$、$\angle C=\angle F$`,
      tex`$\frac{AB}{DE}=\frac{BC}{EF}=\frac{CA}{FD}=k$`,
      tex`周长比 $\frac{AB+BC+CA}{DE+EF+FD}=k$`,
      tex`面积比 $\frac{S_{\triangle ABC}}{S_{\triangle DEF}}=k^{2}$`,
      tex`等比性质：$\frac{AB}{DE}=\frac{AB+BC+CA}{DE+EF+FD}$`,
      tex`$k=1$ 时 $\triangle ABC\cong\triangle DEF$，全等是相似的特例`,
    ],
    theorems: [
      tex`相似三角形的定义：对应角相等、对应边成比例`,
      tex`判定定理：两角分别相等；三边成比例；两边成比例且夹角相等`,
      tex`预备定理：平行于三角形一边的直线和其他两边相交，所构成的三角形与原三角形相似`,
      tex`性质：对应高、对应中线、对应角平分线的比都等于相似比`,
      tex`性质：周长比等于相似比，面积比等于相似比的平方`,
    ],
    proof: {
      goal: tex`已知 $\angle A=\angle D$、$\angle B=\angle E$，求证 $\triangle ABC\sim\triangle DEF$，且 $\frac{AB}{DE}=\frac{BC}{EF}=\frac{CA}{FD}$。`,
      steps: [
        {
          s: tex`在 $DE$ 上截取 $DM=AB$，过 $M$ 作 $MN\parallel EF$ 交 $DF$ 于 $N$`,
          r: tex`作图（把 $\triangle ABC$ 搬到 $\triangle DEF$ 里）`,
        },
        {
          s: tex`$\angle DMN=\angle E$，$\angle DNM=\angle F$`,
          r: tex`两直线平行，同位角相等`,
        },
        {
          s: tex`$\triangle DMN\cong\triangle ABC$`,
          r: tex`ASA：$\angle D=\angle A$，$DM=AB$，$\angle DMN=\angle B$`,
        },
        {
          s: tex`$MN=BC$，$DN=AC$`,
          r: tex`全等三角形的对应边相等`,
        },
        {
          s: tex`$\frac{DM}{DE}=\frac{DN}{DF}=\frac{MN}{EF}$`,
          r: tex`平行线分线段成比例：在 $\triangle DEF$ 中 $MN\parallel EF$`,
        },
        {
          s: tex`$\frac{AB}{DE}=\frac{AC}{DF}=\frac{BC}{EF}$`,
          r: tex`等量代换：把 $DM$、$DN$、$MN$ 换成 $AB$、$AC$、$BC$`,
        },
        {
          s: tex`$\frac{S_{\triangle ABC}}{S_{\triangle DEF}}=\frac{\frac{1}{2}AB\cdot AC\sin A}{\frac{1}{2}DE\cdot DF\sin D}=\frac{AB}{DE}\cdot\frac{AC}{DF}=k^{2}$`,
          r: tex`两边夹角面积公式；其中 $\sin A=\sin D$`,
        },
        {
          s: tex`周长比等于相似比 $k$`,
          r: tex`等比性质：$\frac{AB}{DE}=\frac{BC}{EF}=\frac{CA}{FD}=k$ 时，各边和之比仍为 $k$`,
        },
      ],
      note: tex`相似比是有顺序的：$\triangle ABC\sim\triangle DEF$ 的相似比是 $\frac{AB}{DE}$，若写成 $\triangle DEF\sim\triangle ABC$，相似比就变成 $\frac{DE}{AB}$。这是衔接拓展内容，八年级可以先用“平行截两边”理解比例，九年级再系统学判定。`,
    },
    example: {
      problem: tex`已知 $\triangle ABC\sim\triangle DEF$，$AB=4$，$DE=6$，$BC=5$，$\angle A=50^{\circ}$，$\angle B=60^{\circ}$。求 $EF$、$\angle F$、周长比与面积比。`,
      given: tex`$\triangle ABC\sim\triangle DEF$，对应关系为 $A\leftrightarrow D$、$B\leftrightarrow E$、$C\leftrightarrow F$。`,
      steps: [
        {
          s: tex`相似比 $k=\frac{AB}{DE}=\frac{4}{6}=\frac{2}{3}$`,
          r: tex`相似三角形的定义：对应边的比就是相似比`,
        },
        {
          s: tex`$\frac{BC}{EF}=\frac{2}{3}$，所以 $EF=\frac{15}{2}=7.5$`,
          r: tex`对应边成比例`,
        },
        {
          s: tex`$\angle D=\angle A=50^{\circ}$，$\angle E=\angle B=60^{\circ}$`,
          r: tex`相似三角形对应角相等`,
        },
        {
          s: tex`$\angle F=180^{\circ}-50^{\circ}-60^{\circ}=70^{\circ}$`,
          r: tex`三角形内角和`,
        },
        {
          s: tex`周长比为 $2:3$，面积比为 $4:9$`,
          r: tex`周长比等于相似比，面积比等于相似比的平方`,
        },
      ],
      conclusion: tex`$EF=7.5$，$\angle F=70^{\circ}$，周长比 $2:3$，面积比 $4:9$。注意 $EF$ 必须与 $BC$ 对应，写成 $\frac{BC}{EF}$ 而不是 $\frac{BC}{DE}$。`,
    },
    variants: [
      {
        title: tex`AA 判定`,
        desc: tex`只给两组角相等就能判相似，是考场上最常用的一条；直角三角形中只要再有一组锐角相等即可。`,
      },
      {
        title: tex`SAS 相似`,
        desc: tex`两边成比例且夹角相等，注意夹角必须是两组对应边的夹角，不能是 SSA。`,
      },
      {
        title: tex`三个三角形两两相似`,
        desc: tex`如斜边上的高把直角三角形分成两个小三角形，三者两两相似，见“母子型与射影定理”。`,
      },
      {
        title: tex`相似与全等的转化`,
        desc: tex`相似比为 $1$ 时相似退化为全等；把 $\triangle ABC$ 平移、旋转、翻折后仍与原三角形全等，也仍相似。`,
      },
    ],
    pitfalls: [
      tex`对应顶点顺序写错：$\triangle ABC\sim\triangle DEF$ 对应 $A\leftrightarrow D$，不能随手写成 $\triangle ABC\sim\triangle EDF$。`,
      tex`比例式左右不对应，如把 $\frac{AB}{DE}$ 写成 $\frac{AB}{EF}$。`,
      tex`面积比误写成相似比：边长放大 $2$ 倍，面积放大 $4$ 倍。`,
      tex`用 SSA（两边成比例、其中一边的对角相等）直接判相似，这是不成立的。`,
    ],
    related: ["a-shape", "eight-shape", "altitude-projection", "area-method"],
    tags: [tex`相似`, tex`AA 判定`, tex`相似比`, tex`面积比`, tex`基础`],
  },
  {
    id: "a-shape",
    name: "A 字模型（平行截相似）",
    alias: ["A 型相似", "平行截两边模型"],
    categories: ["similarity"],
    grade: "八年级下",
    difficulty: 2,
    importance: 4,
    mnemonic: tex`一横平行截两边，小三角形套大三角形；上比全、上比下，两套比例别打架。`,
    summary: tex`在三角形中，一条平行于底边的线段截两边，截出的小三角形与大三角形相似，图形像汉字“A”。它是“平行线分线段成比例”与“相似三角形”之间最直接的桥梁，属于八、九年级衔接的拓展内容：八年级可以先把它当作“平行线分线段成比例”的图形来用，九年级再用相似三角形正式证明。`,
    definition: tex`如图，在 $\triangle ABC$ 中，点 $D$ 在 $AB$ 上，点 $E$ 在 $AC$ 上，且 $DE\parallel BC$，则 $\triangle ADE\sim\triangle ABC$（$A\leftrightarrow A$、$D\leftrightarrow B$、$E\leftrightarrow C$），于是 $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$。由平行线分线段成比例还得到 $\frac{AD}{DB}=\frac{AE}{EC}$。前者是“上比全”，后者是“上比下”，两套式子来源相同但用法不同。`,
    conditions: [
      tex`$DE\parallel BC$`,
      tex`$D$ 在 $AB$ 上、$E$ 在 $AC$ 上（截的是两边，不是延长线）`,
      tex`$\angle A$ 是两个三角形的公共角`,
      tex`同位角 $\angle ADE=\angle ABC$、$\angle AED=\angle ACB$`,
      tex`题目要求线段比、线段长或面积比`,
      tex`或者反过来：已知两边上的比，要证 $DE\parallel BC$（逆用）`,
    ],
    triggers: [
      tex`平行`,
      tex`A 字`,
      tex`截两边`,
      tex`公共角`,
      tex`同位角`,
      tex`线段比`,
      tex`面积比`,
    ],
    figure: "a-shape",
    auxSteps: [
      {
        step: 1,
        title: tex`作平行线截出小三角形`,
        detail: tex`过 $AB$ 上的点 $D$ 作 $DE\parallel BC$，交 $AC$ 于 $E$（若图中已给出 $DE$，就补标平行符号）。`,
        gain: tex`得到两组同位角 $\angle ADE=\angle ABC$、$\angle AED=\angle ACB$`,
      },
      {
        step: 2,
        title: tex`标出公共角`,
        detail: tex`$\angle DAE$ 与 $\angle BAC$ 本来就是同一个角，写条件时写 $\angle A=\angle A$。`,
        gain: tex`两组等角凑齐，可用 AA 判定 $\triangle ADE\sim\triangle ABC$`,
      },
      {
        step: 3,
        title: tex`分清两套比例式`,
        detail: tex`由相似得 $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$（上比全，等于相似比）；由平行线分线段成比例得 $\frac{AD}{DB}=\frac{AE}{EC}$（上比下）。`,
        gain: tex`求整条边用第一套，求分点用第二套，不会混用`,
      },
    ],
    whyAux: tex`A 字模型的信息一半在“平行”，一半在“公共角”。平行给出同位角相等，公共角是现成的，两者合起来正好是 AA，所以辅助线的任务就是把平行线作出来（或把已有的平行关系标清楚）。反过来，若题目只给了比例式而没给平行，就先由 SAS 相似推出 $\angle ADE=\angle ABC$，再由同位角相等得到 $DE\parallel BC$——这正是“证平行”的常用套路。`,
    newRelations: [
      tex`$\triangle ADE\sim\triangle ABC$`,
      tex`$\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$`,
      tex`$\frac{AD}{DB}=\frac{AE}{EC}$（平行线分线段成比例）`,
      tex`$\frac{S_{\triangle ADE}}{S_{\triangle ABC}}=\left(\frac{AD}{AB}\right)^{2}$`,
      tex`$\frac{S_{\triangle ADE}}{S_{\text{梯形}DBCE}}=\frac{AD^{2}}{AB^{2}-AD^{2}}$`,
      tex`$\frac{AD}{AB}=\frac{1}{2}$ 时 $DE$ 是中位线，$DE=\frac{1}{2}BC$`,
    ],
    theorems: [
      tex`相似三角形判定：两角分别相等的两个三角形相似`,
      tex`平行线的性质：两直线平行，同位角相等`,
      tex`平行线分线段成比例定理`,
      tex`相似三角形性质：对应边成比例，面积比等于相似比的平方`,
      tex`三角形中位线定理（$AD=DB$ 时的特例）`,
    ],
    proof: {
      goal: tex`已知 $DE\parallel BC$，$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，求证 $\triangle ADE\sim\triangle ABC$，且 $\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$。`,
      steps: [
        { s: tex`$\angle A=\angle A$`, r: tex`公共角` },
        {
          s: tex`$\angle ADE=\angle ABC$`,
          r: tex`两直线平行（$DE\parallel BC$），同位角相等`,
        },
        {
          s: tex`$\triangle ADE\sim\triangle ABC$`,
          r: tex`两角分别相等的两个三角形相似（$A\leftrightarrow A$、$D\leftrightarrow B$、$E\leftrightarrow C$）`,
        },
        {
          s: tex`$\angle AED=\angle ACB$`,
          r: tex`相似三角形对应角相等（也可由 $DE\parallel BC$ 的同位角直接得到）`,
        },
        {
          s: tex`$\frac{AD}{AB}=\frac{AE}{AC}=\frac{DE}{BC}$`,
          r: tex`相似三角形对应边成比例`,
        },
        {
          s: tex`$\frac{AD}{DB}=\frac{AE}{EC}$`,
          r: tex`平行线分线段成比例定理的推论：$DE\parallel BC$ 截 $AB$、$AC$，得 $\frac{AD}{DB}=\frac{AE}{EC}$`,
        },
        {
          s: tex`$\frac{S_{\triangle ADE}}{S_{\triangle ABC}}=\left(\frac{AD}{AB}\right)^{2}$`,
          r: tex`相似三角形面积比等于相似比的平方`,
        },
        {
          s: tex`若已知 $\frac{AD}{AB}=\frac{AE}{AC}$，则由两边成比例且夹角相等得 $\triangle ADE\sim\triangle ABC$，从而 $\angle ADE=\angle ABC$；又这两个角是同位角，故 $DE\parallel BC$`,
          r: tex`SAS 相似；相似三角形对应角相等；同位角相等，两直线平行`,
        },
      ],
      note: tex`八年级可以先用“平行线分线段成比例”接受 $\frac{AD}{DB}=\frac{AE}{EC}$，等九年级学了相似再补上“为什么”。注意当 $E$ 落在 $CA$ 的延长线上时，图形变成“A 字的变式”，比例式的方向要重新判断。`,
    },
    example: {
      problem: tex`如图，在 $\triangle ABC$ 中，$DE\parallel BC$，$AD=2$，$DB=3$，$DE=4$。求 $BC$；若 $S_{\triangle ADE}=4$，求 $S_{\triangle ABC}$ 与梯形 $DBCE$ 的面积。`,
      given: tex`$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，$DE\parallel BC$。`,
      steps: [
        { s: tex`$AB=AD+DB=2+3=5$`, r: tex`线段的和` },
        {
          s: tex`$\frac{AD}{AB}=\frac{DE}{BC}$，即 $\frac{2}{5}=\frac{4}{BC}$，得 $BC=10$`,
          r: tex`A 字模型：相似三角形对应边成比例`,
        },
        {
          s: tex`$\frac{S_{\triangle ADE}}{S_{\triangle ABC}}=\left(\frac{2}{5}\right)^{2}=\frac{4}{25}$，得 $S_{\triangle ABC}=25$`,
          r: tex`相似三角形面积比等于相似比的平方`,
        },
        {
          s: tex`$S_{\text{梯形}DBCE}=25-4=21$`,
          r: tex`整体减去部分`,
        },
        {
          s: tex`检验：$\frac{DE}{BC}=\frac{4}{10}=\frac{2}{5}=\frac{AD}{AB}$`,
          r: tex`回代验证相似比一致`,
        },
      ],
      conclusion: tex`$BC=10$，$S_{\triangle ABC}=25$，梯形 $DBCE$ 的面积为 $21$。梯形与三角形的面积比是 $21:4$，也可以直接用 $\frac{AB^{2}-AD^{2}}{AD^{2}}=\frac{25-4}{4}$ 验证。`,
    },
    variants: [
      {
        title: tex`中位线型`,
        desc: tex`$AD=DB$ 时 $DE$ 是中位线，$DE=\frac{1}{2}BC$，面积比 $1:4$，此时 A 字模型退化为中位线定理。`,
      },
      {
        title: tex`双 A 字`,
        desc: tex`$DE\parallel FG\parallel BC$ 时，$\triangle ADE$、$\triangle AFG$、$\triangle ABC$ 两两相似，比值为三条平行线到 $A$ 的距离之比。`,
      },
      {
        title: tex`逆 A 字（证平行）`,
        desc: tex`已知 $\frac{AD}{AB}=\frac{AE}{AC}$，先由 SAS 判相似，得 $\angle ADE=\angle ABC$，从而 $DE\parallel BC$。`,
      },
      {
        title: tex`A 字求面积`,
        desc: tex`已知 $S_{\triangle ADE}$ 与相似比求 $S_{\triangle ABC}$，或反过来求梯形面积，注意面积比是相似比的平方。`,
      },
    ],
    pitfalls: [
      tex`比例写错：应是 $\frac{AD}{AB}=\frac{DE}{BC}$，不能写成 $\frac{AD}{DB}=\frac{DE}{BC}$。`,
      tex`忘记 $AB=AD+DB$，把 $AD$ 直接当成 $AB$。`,
      tex`面积比误用相似比：相似比 $\frac{2}{5}$ 时面积比是 $\frac{4}{25}$，不是 $\frac{2}{5}$。`,
      tex`$E$ 在 $CA$ 延长线上时仍照搬“截两边”的结论，没有重新判断对应关系。`,
    ],
    related: ["similar-basic", "parallel-ratio", "eight-shape", "anti-a"],
    tags: [tex`相似`, tex`平行`, tex`A 字`, tex`面积比`],
  },
  {
    id: "anti-a",
    name: "反 A 字模型（共角相似）",
    alias: ["共角相似", "斜截相似模型"],
    categories: ["similarity"],
    grade: "九年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: tex`共角一对角相等，边要“交叉”去对应；$AE$ 配 $AB$、$AD$ 配 $AC$，不平行才是反 A。`,
    summary: tex`两个三角形有一个公共角，再有一对“错位”的角相等，就相似，图形像倒过来的“A”。它和 A 字模型只差一个条件——$DE$ 与 $BC$ 不平行，但比例式的对应关系完全相反，是最容易写错的一类相似。属于衔接拓展内容，八年级可先了解“共角 + 一对等角”的图形，九年级再练对应关系。`,
    definition: tex`如图，在 $\triangle ABC$ 中，点 $D$ 在 $AB$ 上，点 $E$ 在 $AC$ 上，若 $\angle AED=\angle ABC$（注意等角的顶点分别是 $E$ 和 $B$），则 $\triangle AED\sim\triangle ABC$，对应关系为 $A\leftrightarrow A$、$E\leftrightarrow B$、$D\leftrightarrow C$，于是 $\frac{AE}{AB}=\frac{AD}{AC}=\frac{ED}{BC}$。此时 $DE$ 与 $BC$ 不平行，所以叫“反 A 字”。`,
    conditions: [
      tex`$\angle A$ 是两个三角形的公共角`,
      tex`$D$ 在 $AB$ 上、$E$ 在 $AC$ 上（也可以在边的延长线上）`,
      tex`一对错位的角相等：$\angle AED=\angle ABC$`,
      tex`或者夹边成比例：$\frac{AD}{AC}=\frac{AE}{AB}$，即 $AD\cdot AB=AE\cdot AC$`,
      tex`$DE$ 与 $BC$ 不平行（平行就变成 A 字模型）`,
      tex`题目求线段长，或要求证明乘积式`,
    ],
    triggers: [
      tex`共角`,
      tex`一对角相等`,
      tex`斜截`,
      tex`不平行`,
      tex`乘积式`,
      tex`比例中项`,
      tex`求线段长`,
    ],
    figure: "anti-a",
    auxSteps: [
      {
        step: 1,
        title: tex`作出使等角成立的那条截线`,
        detail: tex`过 $AC$ 上的点 $E$ 作射线，与 $AB$ 交于 $D$，使 $\angle AED=\angle ABC$。若图中已画出 $DE$，就补标这个等角。`,
        gain: tex`得到一个与 $\triangle ABC$ 共角、且有一对等角的 $\triangle AED$`,
      },
      {
        step: 2,
        title: tex`把等角标到顶点上`,
        detail: tex`$\angle AED$ 的顶点是 $E$，$\angle ABC$ 的顶点是 $B$，所以 $E\leftrightarrow B$；公共角的顶点 $A\leftrightarrow A$，剩下的 $D\leftrightarrow C$。`,
        gain: tex`确定对应关系，避免把 $AD$ 与 $AB$ 配成一对`,
      },
      {
        step: 3,
        title: tex`按顶点顺序写比例`,
        detail: tex`由 $\triangle AED\sim\triangle ABC$ 写 $\frac{AE}{AB}=\frac{AD}{AC}=\frac{ED}{BC}$，交叉相乘得 $AD\cdot AB=AE\cdot AC$。`,
        gain: tex`得到“交叉”的比例式与乘积式，可直接求线段`,
      },
    ],
    whyAux: tex`反 A 字最难的不是判定，而是对应关系。两个三角形共顶点 $A$、共一个角，图形上“看起来”$AD$ 应该配 $AB$，但等角 $\angle AED=\angle ABC$ 决定了 $AD$ 必须配 $AC$。把角标到顶点上再按顺序写比例，就能避免这类错误；辅助线的作用就是把那个“使等角成立的截线”作出来，让条件看得见。`,
    newRelations: [
      tex`$\triangle AED\sim\triangle ABC$`,
      tex`$\frac{AE}{AB}=\frac{AD}{AC}=\frac{ED}{BC}$`,
      tex`$\angle ADE=\angle ACB$`,
      tex`$AD\cdot AB=AE\cdot AC$（乘积式）`,
      tex`$\frac{S_{\triangle AED}}{S_{\triangle ABC}}=\left(\frac{AE}{AB}\right)^{2}$`,
      tex`当 $AB=AC$ 时，$AD=AE$（等腰背景下反 A 字左右对称）`,
    ],
    theorems: [
      tex`相似三角形判定：两角分别相等的两个三角形相似`,
      tex`相似三角形判定：两边成比例且夹角相等`,
      tex`比例的基本性质：内项积等于外项积`,
      tex`相似三角形性质：对应角相等、对应边成比例、面积比等于相似比平方`,
      tex`三角形内角和定理`,
    ],
    proof: {
      goal: tex`在 $\triangle ABC$ 中，$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，$\angle AED=\angle ABC$，求证 $\triangle AED\sim\triangle ABC$，且 $\frac{AE}{AB}=\frac{AD}{AC}=\frac{ED}{BC}$。`,
      steps: [
        { s: tex`$\angle A=\angle A$`, r: tex`公共角` },
        { s: tex`$\angle AED=\angle ABC$`, r: tex`已知` },
        {
          s: tex`$\triangle AED\sim\triangle ABC$`,
          r: tex`两角分别相等的两个三角形相似（$A\leftrightarrow A$、$E\leftrightarrow B$、$D\leftrightarrow C$）`,
        },
        {
          s: tex`$\angle ADE=\angle ACB$`,
          r: tex`相似三角形对应角相等`,
        },
        {
          s: tex`$\frac{AE}{AB}=\frac{AD}{AC}=\frac{ED}{BC}$`,
          r: tex`相似三角形对应边成比例`,
        },
        {
          s: tex`$AD\cdot AB=AE\cdot AC$`,
          r: tex`比例的基本性质：$\frac{AD}{AC}=\frac{AE}{AB}$ 交叉相乘`,
        },
        {
          s: tex`反过来：若 $\angle A$ 公共且 $\frac{AD}{AC}=\frac{AE}{AB}$，则 $\triangle ADE\sim\triangle ACB$`,
          r: tex`两边成比例且夹角相等（夹角都是 $\angle A$）`,
        },
      ],
      note: tex`反 A 字的“反”就反在对应关系上：A 字里 $AD$ 配 $AB$，反 A 字里 $AD$ 配 $AC$。判断口诀是“等角的顶点互换”，$\angle AED=\angle ABC$ 把 $E$ 和 $B$ 绑在一起。`,
    },
    example: {
      problem: tex`在 $\triangle ABC$ 中，$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，$\angle AED=\angle ABC$，$AE=3$，$AB=6$，$AC=4$，$BC=5$。求 $AD$ 与 $ED$。`,
      given: tex`$\angle A$ 公共，$\angle AED=\angle ABC$。`,
      steps: [
        { s: tex`$\triangle AED\sim\triangle ABC$`, r: tex`公共角 $\angle A$ 与已知等角，AA 判定` },
        {
          s: tex`$\frac{AE}{AB}=\frac{AD}{AC}$，即 $\frac{3}{6}=\frac{AD}{4}$，得 $AD=2$`,
          r: tex`对应边成比例（$AE$ 对应 $AB$，$AD$ 对应 $AC$）`,
        },
        {
          s: tex`$\frac{ED}{BC}=\frac{AE}{AB}=\frac{1}{2}$，得 $ED=2.5$`,
          r: tex`对应边成比例`,
        },
        {
          s: tex`检验：$AD=2<AB=6$，$AE=3<AC=4$，相似比 $\frac{1}{2}$，位置合理`,
          r: tex`回代验证点的位置与相似比`,
        },
      ],
      conclusion: tex`$AD=2$，$ED=2.5$。若误按 A 字写 $\frac{AD}{AB}=\frac{AE}{AC}$，会得到 $AD=4.5$——数值看着也“合理”，但对应关系是错的，这正是反 A 字最容易失分的地方。`,
    },
    variants: [
      {
        title: tex`等腰反 A 字`,
        desc: tex`若 $AB=AC$，由 $AD\cdot AB=AE\cdot AC$ 得 $AD=AE$，图形关于 $\angle A$ 的平分线对称。`,
      },
      {
        title: tex`乘积式与比例中项`,
        desc: tex`由 $AD\cdot AB=AE\cdot AC$ 求线段，或把它改写成 $\frac{AD}{AE}=\frac{AC}{AB}$ 求比例中项。`,
      },
      {
        title: tex`反 A 与 A 字对照`,
        desc: tex`只差“$DE\parallel BC$”一个条件：平行时用 $\frac{AD}{AB}=\frac{AE}{AC}$，不平行而 $\angle AED=\angle ABC$ 时用 $\frac{AE}{AB}=\frac{AD}{AC}$。`,
      },
      {
        title: tex`反 A 字求面积`,
        desc: tex`先定相似比（注意是 $\frac{AE}{AB}$），再用面积比等于相似比平方求面积。`,
      },
    ],
    pitfalls: [
      tex`把对应关系写成 A 字：$\frac{AD}{AB}=\frac{AE}{AC}$，正确应是 $\frac{AE}{AB}=\frac{AD}{AC}$。`,
      tex`顶点顺序写错：应写 $\triangle AED\sim\triangle ABC$，写成 $\triangle ADE\sim\triangle ABC$ 就错了。`,
      tex`误以为 $DE\parallel BC$，套用“平行线分线段成比例”，得到错误的比例。`,
      tex`用“两边成比例 + 其中一边的对角相等”直接判相似（SSA 不成立），必须确认夹角是 $\angle A$。`,
    ],
    related: ["similar-basic", "a-shape", "altitude-projection", "eight-shape"],
    tags: [tex`相似`, tex`共角`, tex`反 A`, tex`乘积式`],
  },
  {
    id: "eight-shape",
    name: "8 字模型（对顶相似）",
    alias: ["X 型相似", "沙漏模型"],
    categories: ["similarity"],
    grade: "八年级下",
    difficulty: 2,
    importance: 4,
    mnemonic: tex`两条直线交一点，一组平行出内错；对顶角加上内错角，8 字相似跑不了。`,
    summary: tex`两条直线相交于一点，再加一组平行线，就得到一对“8 字”形的相似三角形。它提供的是“交点分线段成比例”这一结论，是求线段比、证中点、算面积的常用工具。属于八、九年级衔接的拓展内容，八年级可以先用内错角与平行线分线段成比例理解，九年级再用相似正式书写。`,
    definition: tex`如图，$AB\parallel CD$，线段 $AC$ 与 $BD$ 交于点 $O$，则 $\triangle AOB\sim\triangle COD$，对应关系为 $A\leftrightarrow C$、$B\leftrightarrow D$、$O\leftrightarrow O$，于是 $\frac{AO}{CO}=\frac{BO}{DO}=\frac{AB}{CD}$。因为两个三角形在交点处对顶、上下各一条平行边，形状像数字“8”，所以叫 8 字模型。`,
    conditions: [
      tex`两条线段 $AC$、$BD$ 相交于点 $O$（$O$ 在两条线段内部）`,
      tex`$AB\parallel CD$（或已知 $\angle OAB=\angle OCD$、$\angle OBA=\angle ODC$）`,
      tex`对顶角 $\angle AOB=\angle COD$ 自动成立`,
      tex`内错角 $\angle OAB=\angle OCD$、$\angle OBA=\angle ODC$ 由平行得到`,
      tex`题目要求 $AO:OC$、$BO:OD$ 或 $AB:CD$`,
      tex`常见于梯形、平行四边形、两条平行线之间的连线`,
    ],
    triggers: [
      tex`8 字`,
      tex`对顶角`,
      tex`内错角`,
      tex`两条平行线`,
      tex`交点`,
      tex`线段比`,
      tex`沙漏`,
    ],
    figure: "eight-shape",
    auxSteps: [
      {
        step: 1,
        title: tex`连出两条“对角线”，确定交点`,
        detail: tex`连接 $AC$ 与 $BD$，记交点为 $O$。若图中已有交点，就补标 $O$ 与两组线段。`,
        gain: tex`出现对顶角 $\angle AOB=\angle COD$，把上下两条平行边“接”到一起`,
      },
      {
        step: 2,
        title: tex`标出内错角`,
        detail: tex`由 $AB\parallel CD$ 得 $\angle OAB=\angle OCD$（$Z$ 字形），同理 $\angle OBA=\angle ODC$。`,
        gain: tex`凑齐两角相等，可用 AA 判定 $\triangle AOB\sim\triangle COD$`,
      },
      {
        step: 3,
        title: tex`按顺序写比例`,
        detail: tex`$\frac{AO}{CO}=\frac{BO}{DO}=\frac{AB}{CD}$；若要 $\frac{AO}{AC}$，先用 $AC=AO+CO$ 或直接用合比 $\frac{AO}{AC}=\frac{AB}{AB+CD}$。`,
        gain: tex`得到交点分两线段的比，可直接求长度`,
      },
    ],
    whyAux: tex`8 字模型的关键是“把两条平行线连起来”。$AC$、$BD$ 一画，交点处自动出现对顶角，平行线又给出内错角，两个角一齐，相似就成立。辅助线的目的不是“多画线”，而是把分散在上下两条平行线上的角集中到同一个交点。`,
    newRelations: [
      tex`$\triangle AOB\sim\triangle COD$`,
      tex`$\frac{AO}{CO}=\frac{BO}{DO}=\frac{AB}{CD}$`,
      tex`$\frac{AO}{AC}=\frac{AB}{AB+CD}$（合比）`,
      tex`$\frac{S_{\triangle AOB}}{S_{\triangle COD}}=\left(\frac{AB}{CD}\right)^{2}$`,
      tex`若 $AB=CD$，则 $\triangle AOB\cong\triangle COD$，$O$ 是 $AC$、$BD$ 的中点`,
      tex`若 $AO=CO$，则 $AB=CD$`,
    ],
    theorems: [
      tex`相似三角形判定：两角分别相等的两个三角形相似`,
      tex`两直线平行，内错角相等`,
      tex`对顶角相等`,
      tex`相似三角形性质：对应边成比例、面积比等于相似比平方`,
      tex`比例的性质（合比）`,
    ],
    proof: {
      goal: tex`已知 $AB\parallel CD$，$AC$ 与 $BD$ 交于 $O$，求证 $\triangle AOB\sim\triangle COD$，且 $\frac{AO}{CO}=\frac{BO}{DO}=\frac{AB}{CD}$。`,
      steps: [
        { s: tex`$\angle AOB=\angle COD$`, r: tex`对顶角相等` },
        {
          s: tex`$\angle OAB=\angle OCD$`,
          r: tex`$AB\parallel CD$，两直线平行，内错角相等`,
        },
        {
          s: tex`$\triangle AOB\sim\triangle COD$`,
          r: tex`两角分别相等的两个三角形相似（$A\leftrightarrow C$、$B\leftrightarrow D$、$O\leftrightarrow O$）`,
        },
        {
          s: tex`$\angle OBA=\angle ODC$`,
          r: tex`相似三角形对应角相等（也可由内错角直接得到）`,
        },
        {
          s: tex`$\frac{AO}{CO}=\frac{BO}{DO}=\frac{AB}{CD}$`,
          r: tex`相似三角形对应边成比例`,
        },
        {
          s: tex`$\frac{AO}{AC}=\frac{AB}{AB+CD}$`,
          r: tex`合比性质：$AC=AO+CO$，由 $\frac{AO}{CO}=\frac{AB}{CD}$ 得 $\frac{AO}{AO+CO}=\frac{AB}{AB+CD}$`,
        },
        {
          s: tex`若 $AB=CD$，则相似比为 $1$，$\triangle AOB\cong\triangle COD$，$AO=CO$、$BO=DO$`,
          r: tex`相似比为 $1$ 的两个三角形全等`,
        },
      ],
      note: tex`8 字有两种摆放：$AB$ 在上、$CD$ 在下（本图），或左右并列。不管方向，认准“平行的一组边写在比例式的同一位置”，就不会把 $\frac{AO}{CO}$ 写成 $\frac{AO}{BO}$。`,
    },
    example: {
      problem: tex`如图，$AB\parallel CD$，$AC$ 与 $BD$ 交于 $O$，$AB=6$，$CD=9$，$AC=10$，$BD=12.5$。求 $AO$、$OC$、$BO$、$OD$。`,
      given: tex`$AB\parallel CD$，$O$ 是 $AC$ 与 $BD$ 的交点。`,
      steps: [
        {
          s: tex`$\triangle AOB\sim\triangle COD$，$\frac{AO}{OC}=\frac{AB}{CD}=\frac{6}{9}=\frac{2}{3}$`,
          r: tex`8 字模型（内错角 + 对顶角）`,
        },
        {
          s: tex`$AC=AO+OC=10$，且 $AO:OC=2:3$，得 $AO=4$，$OC=6$`,
          r: tex`按比例分配`,
        },
        {
          s: tex`$\frac{BO}{OD}=\frac{2}{3}$，$BD=BO+OD=12.5$，得 $BO=5$，$OD=7.5$`,
          r: tex`同一相似比`,
        },
        {
          s: tex`检验：$\frac{AO}{OC}=\frac{4}{6}=\frac{2}{3}$，$\frac{BO}{OD}=\frac{5}{7.5}=\frac{2}{3}$`,
          r: tex`回代验证两组比一致`,
        },
      ],
      conclusion: tex`$AO=4$，$OC=6$，$BO=5$，$OD=7.5$。若题目给的是 $AO$ 与 $AC$，要先算出 $OC=AC-AO$ 再用比例，不能拿 $AO$ 直接与 $AB$ 比。`,
    },
    variants: [
      {
        title: tex`8 字 + 中点`,
        desc: tex`$AB=CD$ 时相似比为 $1$，两个三角形全等，$O$ 同时是 $AC$、$BD$ 的中点，可用来证“对角线互相平分”。`,
      },
      {
        title: tex`梯形对角线 8 字`,
        desc: tex`梯形 $ABCD$ 中 $AD\parallel BC$，对角线交于 $O$，则 $\triangle AOD\sim\triangle COB$，且 $S_{\triangle AOB}=S_{\triangle COD}$。`,
      },
      {
        title: tex`8 字求面积比`,
        desc: tex`$\frac{S_{\triangle AOB}}{S_{\triangle COD}}=\left(\frac{AB}{CD}\right)^{2}$，常与“同高面积比”一起用。`,
      },
      {
        title: tex`8 字与 A 字叠加`,
        desc: tex`两条平行线之间画两条相交的截线，可同时得到 8 字与 A 字，注意两组比例式的对应边不同。`,
      },
    ],
    pitfalls: [
      tex`对应顶点写错：应是 $\triangle AOB\sim\triangle COD$，不是 $\triangle AOB\sim\triangle CDO$。`,
      tex`把 $\frac{AO}{CO}$ 写成 $\frac{AO}{BO}$，两条线段不在同一条直线上。`,
      tex`只有对顶角相等就判相似——还差一组内错角（即还差 $AB\parallel CD$）。`,
      tex`求 $\frac{AO}{AC}$ 时忘记 $AC=AO+CO$，直接用 $\frac{AO}{OC}$ 当答案。`,
    ],
    related: ["a-shape", "similar-basic", "parallel-ratio", "area-method"],
    tags: [tex`相似`, tex`对顶角`, tex`内错角`, tex`8 字`],
  },
  {
    id: "three-equal-similar",
    name: "一线三等角相似模型（同线三等角）",
    alias: ["三等角模型", "一线三等角（相似型）"],
    categories: ["similarity"],
    grade: "九年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: tex`三点共线三个角，两头相等中间桥；平角一减角搬家，$AC=CE$ 就全等。`,
    summary: tex`同一直线上依次有三个相等的角，两侧的两个三角形就相似。它把“角相等”与“三点共线”结合起来，是相似里最能“倒角”的模型；当三个角都是 $90^{\circ}$ 时就是“一线三垂直”。属于衔接拓展内容，八年级可以先了解“三个等角 + 三点共线”的图形，九年级再练倒角与比例式。`,
    definition: tex`如图，点 $B$、$C$、$D$ 在同一直线上，且 $\angle ABC=\angle ACE=\angle CDE=\alpha$，则 $\triangle ABC\sim\triangle CDE$，对应关系为 $A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$，于是 $\frac{AB}{CD}=\frac{BC}{DE}=\frac{AC}{CE}$。特别地，当 $\alpha=90^{\circ}$ 时就是“一线三垂直”；当 $AC=CE$ 时相似比为 $1$，两个三角形全等。`,
    conditions: [
      tex`点 $B$、$C$、$D$ 三点共线`,
      tex`三个相等的角依次以这条直线上的点为顶点：$\angle ABC=\angle ACE=\angle CDE$`,
      tex`中间的角 $\angle ACE$ 的顶点 $C$ 落在直线上，是“桥”`,
      tex`$AB$、$DE$ 在直线 $BD$ 的同侧`,
      tex`特例：三个角都是 $90^{\circ}$（一线三垂直）`,
      tex`题目求线段长、证比例式，或问“何时全等”`,
    ],
    triggers: [
      tex`三点共线`,
      tex`三个等角`,
      tex`一线三等角`,
      tex`一线三垂直`,
      tex`垂直`,
      tex`比例式`,
      tex`全等`,
    ],
    figure: "three-equal-similar",
    auxSteps: [
      {
        step: 1,
        title: tex`补出第三个等角`,
        detail: tex`在直线 $BD$ 上取点 $C$，作 $\angle ACE=\angle ABC$（若图中已给出，就补标这三个 $\alpha$）。`,
        gain: tex`使直线上的三个角都等于 $\alpha$，形成“两头各一个、中间一个”的结构`,
      },
      {
        step: 2,
        title: tex`用平角与内角和倒角`,
        detail: tex`$\angle BCA+\angle ACE+\angle ECD=180^{\circ}$，故 $\angle ECD=180^{\circ}-\alpha-\angle BCA$；又在 $\triangle ABC$ 中 $\angle BAC=180^{\circ}-\alpha-\angle BCA$。`,
        gain: tex`得到 $\angle BAC=\angle ECD$，把 $\alpha$ 从左边三角形“搬”到右边三角形`,
      },
      {
        step: 3,
        title: tex`写比例式并整理乘积式`,
        detail: tex`由 $\triangle ABC\sim\triangle CDE$ 得 $\frac{AB}{CD}=\frac{BC}{DE}=\frac{AC}{CE}$，交叉相乘得 $AB\cdot DE=BC\cdot CD$。`,
        gain: tex`得到三组对应边的比例与一个乘积式，可求任意一边`,
      },
    ],
    whyAux: tex`三个等角分散在一条直线上，直接看没有关系。辅助线的目的是“把第三个角造出来”，再用平角把 $\angle BCA$、$\angle ACE$、$\angle ECD$ 三块拼成 $180^{\circ}$，从而把 $\alpha$ 从 $\triangle ABC$ 搬到 $\triangle CDE$。所谓“一线三等角”，本质就是“用平角倒角”。`,
    newRelations: [
      tex`$\triangle ABC\sim\triangle CDE$`,
      tex`$\frac{AB}{CD}=\frac{BC}{DE}=\frac{AC}{CE}$`,
      tex`$AB\cdot DE=BC\cdot CD$（交叉相乘）`,
      tex`当 $AC=CE$ 时 $\triangle ABC\cong\triangle CDE$，此时 $AB=CD$、$BC=DE$`,
      tex`$\alpha=90^{\circ}$ 时 $AC\perp CE$，且 $\triangle ABC$ 中 $AB^{2}+BC^{2}=AC^{2}$`,
      tex`$\frac{S_{\triangle ABC}}{S_{\triangle CDE}}=\left(\frac{AC}{CE}\right)^{2}$`,
    ],
    theorems: [
      tex`相似三角形判定：两角分别相等的两个三角形相似`,
      tex`三角形内角和定理`,
      tex`平角的定义`,
      tex`全等三角形判定：AAS（相似比为 $1$ 时）`,
      tex`勾股定理（$\alpha=90^{\circ}$ 时可用）`,
    ],
    proof: {
      goal: tex`已知 $B$、$C$、$D$ 共线，$\angle ABC=\angle ACE=\angle CDE=\alpha$，求证 $\triangle ABC\sim\triangle CDE$，并说明 $AC=CE$ 时两个三角形全等。`,
      steps: [
        {
          s: tex`$\angle BCA+\angle ACE+\angle ECD=180^{\circ}$`,
          r: tex`$B$、$C$、$D$ 三点共线，平角为 $180^{\circ}$`,
        },
        {
          s: tex`$\angle ECD=180^{\circ}-\alpha-\angle BCA$`,
          r: tex`代入 $\angle ACE=\alpha$`,
        },
        {
          s: tex`$\angle BAC=180^{\circ}-\angle ABC-\angle BCA=180^{\circ}-\alpha-\angle BCA$`,
          r: tex`三角形内角和`,
        },
        {
          s: tex`$\angle BAC=\angle ECD$`,
          r: tex`等量代换`,
        },
        { s: tex`$\angle ABC=\angle CDE=\alpha$`, r: tex`已知` },
        {
          s: tex`$\triangle ABC\sim\triangle CDE$`,
          r: tex`两角分别相等（$A\leftrightarrow C$、$B\leftrightarrow D$、$C\leftrightarrow E$）`,
        },
        {
          s: tex`$\frac{AB}{CD}=\frac{BC}{DE}=\frac{AC}{CE}$`,
          r: tex`相似三角形对应边成比例`,
        },
        {
          s: tex`若 $AC=CE$，则相似比为 $1$，$\triangle ABC\cong\triangle CDE$`,
          r: tex`相似比为 $1$ 的两个三角形全等，对应边 $AB=CD$、$BC=DE$`,
        },
      ],
      note: tex`三个角的位置不能乱：必须是“两端各一个、中间一个”，且中间角的顶点在直线上。若只是 $\angle ABC=\angle CDE$ 而中间角不是 $\angle ACE$，就不能用这个模型。`,
    },
    example: {
      problem: tex`如图，$B$、$C$、$D$ 共线，$\angle ABC=\angle ACE=\angle CDE=90^{\circ}$，$AB=2$，$BC=3$，$CD=6$。求 $DE$ 与 $CE$。`,
      given: tex`一线三垂直：$AB\perp BD$，$CD\perp BD$，$AC\perp CE$。`,
      steps: [
        {
          s: tex`$\angle BAC=90^{\circ}-\angle BCA=\angle DCE$`,
          r: tex`同角的余角相等（也可用平角倒角：$\angle BCA+90^{\circ}+\angle DCE=180^{\circ}$）`,
        },
        { s: tex`$\triangle ABC\sim\triangle CDE$`, r: tex`两角分别相等（$\angle ABC=\angle CDE=90^{\circ}$，$\angle BAC=\angle DCE$）` },
        {
          s: tex`$\frac{AB}{CD}=\frac{BC}{DE}$，即 $\frac{2}{6}=\frac{3}{DE}$，得 $DE=9$`,
          r: tex`对应边成比例`,
        },
        {
          s: tex`$AC=\sqrt{AB^{2}+BC^{2}}=\sqrt{4+9}=\sqrt{13}$`,
          r: tex`勾股定理`,
        },
        {
          s: tex`$\frac{AC}{CE}=\frac{AB}{CD}=\frac{1}{3}$，得 $CE=3\sqrt{13}$`,
          r: tex`对应边成比例`,
        },
        {
          s: tex`检验：$CE^{2}=117$，而 $CD^{2}+DE^{2}=36+81=117$`,
          r: tex`勾股定理回代验证`,
        },
      ],
      conclusion: tex`$DE=9$，$CE=3\sqrt{13}$。本题三个角都是 $90^{\circ}$，故为“一线三垂直”；若再给 $AC=CE$，则 $\triangle ABC\cong\triangle CDE$，此时 $AB=CD$、$BC=DE$。`,
    },
    variants: [
      {
        title: tex`一线三垂直全等`,
        desc: tex`$\alpha=90^{\circ}$ 且 $AC=CE$ 时，$\triangle ABC\cong\triangle CDE$，是“一线三垂直”的全等版本，可用于构造正方形、等腰直角三角形。`,
      },
      {
        title: tex`等边三角形背景（$\alpha=60^{\circ}$）`,
        desc: tex`三个角都是 $60^{\circ}$ 时同样相似，区别只是倒角时用 $60^{\circ}$ 而不是 $90^{\circ}$。`,
      },
      {
        title: tex`三等角求乘积`,
        desc: tex`由 $\frac{AB}{CD}=\frac{BC}{DE}$ 得 $AB\cdot DE=BC\cdot CD$，已知三条线段可求第四条。`,
      },
      {
        title: tex`与“一线三等角全等”对照`,
        desc: tex`本模型只保证相似；要得到全等，必须再补一组对应边相等，最常用的是 $AC=CE$。`,
      },
    ],
    pitfalls: [
      tex`三个角的位置标错：$\angle ACE$ 必须是中间那个，顶点 $C$ 在直线 $BD$ 上。`,
      tex`顶点顺序写错：应是 $\triangle ABC\sim\triangle CDE$，不是 $\triangle ABC\sim\triangle EDC$。`,
      tex`把“三个角相等”直接当成全等——还差一组对应边相等。`,
      tex`忘记 $B$、$C$、$D$ 共线，导致平角倒角（$\angle BCA+\angle ACE+\angle ECD=180^{\circ}$）不成立。`,
    ],
    related: ["one-line-three-angle", "one-line-three-perp", "similar-basic", "a-shape"],
    tags: [tex`相似`, tex`三等角`, tex`三点共线`, tex`一线三垂直`],
  },
  {
    id: "altitude-projection",
    name: "母子型与射影定理（斜边上的高）",
    alias: ["射影定理", "双垂直模型", "母子三角形"],
    categories: ["similarity"],
    grade: "九年级上",
    difficulty: 3,
    importance: 4,
    mnemonic: tex`直角三角形作斜边高，一大两小两两相似；直角边是射影与斜边的比例中项。`,
    summary: tex`直角三角形斜边上的高，把大三角形分成两个小直角三角形，三者两两相似，于是得到三条平方关系，统称射影定理。这是相似与勾股定理之间最漂亮的一座桥。属于衔接拓展内容，八年级可先用面积法算斜边上的高，九年级再用相似给出三条式子。`,
    definition: tex`如图，在 $\triangle ABC$ 中，$\angle ACB=90^{\circ}$，$CD\perp AB$ 于 $D$，则图中有三个直角三角形，且 $\triangle ACD\sim\triangle ABC\sim\triangle CBD$（一个大三角形、两个小三角形，像“母子”）。由此得到射影定理：$CD^{2}=AD\cdot BD$，$AC^{2}=AD\cdot AB$，$BC^{2}=BD\cdot AB$。`,
    conditions: [
      tex`$\angle ACB=90^{\circ}$（大三角形是直角三角形）`,
      tex`$CD\perp AB$，$D$ 在 $AB$ 上（$D$ 是垂足）`,
      tex`图中出现三个直角三角形：大、小、小`,
      tex`要求 $CD$、$AC$、$BC$ 的长，或要求证平方关系`,
      tex`题目出现“斜边上的高”“双垂直”等字眼`,
    ],
    triggers: [
      tex`直角三角形`,
      tex`斜边上的高`,
      tex`双垂直`,
      tex`射影定理`,
      tex`平方`,
      tex`比例中项`,
      tex`母子型`,
    ],
    figure: "altitude-projection",
    auxSteps: [
      {
        step: 1,
        title: tex`作斜边上的高`,
        detail: tex`过直角顶点 $C$ 作 $CD\perp AB$，垂足为 $D$。这条高把大直角三角形分成两个小直角三角形。`,
        gain: tex`出现三个直角三角形，且 $CD$ 是两个小三角形的公共边`,
      },
      {
        step: 2,
        title: tex`标出“同角的余角”`,
        detail: tex`$\angle A+\angle ACD=90^{\circ}$，$\angle BCD+\angle ACD=90^{\circ}$，所以 $\angle A=\angle BCD$；同理 $\angle B=\angle ACD$。`,
        gain: tex`得到两组等角，可证 $\triangle ACD\sim\triangle CBD$、$\triangle ACD\sim\triangle ABC$`,
      },
      {
        step: 3,
        title: tex`写比例式再交叉相乘`,
        detail: tex`由 $\triangle ACD\sim\triangle CBD$ 得 $\frac{AD}{CD}=\frac{CD}{BD}$，交叉相乘即 $CD^{2}=AD\cdot BD$；另两式同理。`,
        gain: tex`得到三条射影定理，不必死记“谁乘谁”`,
      },
    ],
    whyAux: tex`一条高把一个大直角三角形切成两个小直角三角形，三者两两相似，而 $CD$ 同时是“两个小三角形的公共边”，所以它成了 $AD$ 与 $BD$ 的比例中项。作高的目的，就是制造“公共边”与“同角的余角”，让相似关系成链。`,
    newRelations: [
      tex`$\triangle ACD\sim\triangle ABC\sim\triangle CBD$`,
      tex`$CD^{2}=AD\cdot BD$`,
      tex`$AC^{2}=AD\cdot AB$`,
      tex`$BC^{2}=BD\cdot AB$`,
      tex`$AC\cdot BC=AB\cdot CD$（面积法，等积式）`,
      tex`$\frac{AC^{2}}{BC^{2}}=\frac{AD}{BD}$`,
    ],
    theorems: [
      tex`相似三角形判定：两角分别相等的两个三角形相似`,
      tex`直角三角形两锐角互余；同角的余角相等`,
      tex`相似三角形对应边成比例`,
      tex`三角形面积公式（两种算法：$\frac{1}{2}\times$底$\times$高）`,
      tex`勾股定理（可与射影定理互推）`,
    ],
    proof: {
      goal: tex`已知 $\angle ACB=90^{\circ}$，$CD\perp AB$ 于 $D$，求证 $CD^{2}=AD\cdot BD$、$AC^{2}=AD\cdot AB$、$BC^{2}=BD\cdot AB$。`,
      steps: [
        {
          s: tex`$\angle ADC=\angle CDB=\angle ACB=90^{\circ}$`,
          r: tex`$CD\perp AB$ 与 $\angle ACB=90^{\circ}$`,
        },
        {
          s: tex`$\angle A=\angle BCD$`,
          r: tex`同角的余角相等：$\angle A+\angle ACD=90^{\circ}$，$\angle BCD+\angle ACD=90^{\circ}$`,
        },
        {
          s: tex`$\triangle ACD\sim\triangle CBD$`,
          r: tex`两角分别相等（$\angle ADC=\angle CDB=90^{\circ}$，$\angle A=\angle BCD$；$A\leftrightarrow C$、$C\leftrightarrow B$、$D\leftrightarrow D$）`,
        },
        {
          s: tex`$\frac{AD}{CD}=\frac{CD}{BD}$，故 $CD^{2}=AD\cdot BD$`,
          r: tex`相似三角形对应边成比例，交叉相乘`,
        },
        {
          s: tex`$\angle A=\angle A$，$\angle ADC=\angle ACB=90^{\circ}$，故 $\triangle ACD\sim\triangle ABC$`,
          r: tex`两角分别相等的两个三角形相似`,
        },
        {
          s: tex`$\frac{AD}{AC}=\frac{AC}{AB}$，故 $AC^{2}=AD\cdot AB$`,
          r: tex`对应边成比例，交叉相乘`,
        },
        {
          s: tex`同理 $\triangle CBD\sim\triangle ABC$，得 $\frac{BD}{BC}=\frac{BC}{AB}$，故 $BC^{2}=BD\cdot AB$`,
          r: tex`$\angle B=\angle B$，$\angle CDB=\angle ACB=90^{\circ}$`,
        },
        {
          s: tex`$\frac{1}{2}AB\cdot CD=\frac{1}{2}AC\cdot BC$，故 $AC\cdot BC=AB\cdot CD$`,
          r: tex`同一个三角形面积的两种算法（面积法）`,
        },
      ],
      note: tex`三条式子不要死背“谁的平方等于谁乘谁”，记一句话：直角边是“它在斜边上的射影”与“整条斜边”的比例中项，斜边上的高是“两段射影”的比例中项。`,
    },
    example: {
      problem: tex`在 Rt$\triangle ABC$ 中，$\angle ACB=90^{\circ}$，$CD\perp AB$ 于 $D$，$AD=2$，$BD=8$。求 $CD$、$AC$、$BC$ 与 $AB$。`,
      given: tex`$\angle ACB=90^{\circ}$，$CD\perp AB$，$D$ 在 $AB$ 上。`,
      steps: [
        { s: tex`$AB=AD+BD=2+8=10$`, r: tex`线段的和` },
        {
          s: tex`$CD^{2}=AD\cdot BD=2\times8=16$，得 $CD=4$`,
          r: tex`射影定理（取正根）`,
        },
        {
          s: tex`$AC^{2}=AD\cdot AB=2\times10=20$，得 $AC=2\sqrt{5}$`,
          r: tex`射影定理`,
        },
        {
          s: tex`$BC^{2}=BD\cdot AB=8\times10=80$，得 $BC=4\sqrt{5}$`,
          r: tex`射影定理`,
        },
        {
          s: tex`检验：$AC^{2}+BC^{2}=20+80=100=AB^{2}$`,
          r: tex`勾股定理逆定理，说明计算正确`,
        },
        {
          s: tex`面积检验：$AC\cdot BC=2\sqrt{5}\times4\sqrt{5}=40=AB\cdot CD=10\times4$`,
          r: tex`等积式 $AC\cdot BC=AB\cdot CD$`,
        },
      ],
      conclusion: tex`$CD=4$，$AC=2\sqrt{5}$，$BC=4\sqrt{5}$，$AB=10$。三组答案可用勾股定理与面积式双重检验，这是射影定理题最好的自查方法。`,
    },
    variants: [
      {
        title: tex`已知两直角边求高`,
        desc: tex`先用勾股定理求斜边，再用 $AC\cdot BC=AB\cdot CD$ 求斜边上的高，比用射影定理更快。`,
      },
      {
        title: tex`已知高与射影比`,
        desc: tex`给 $CD$ 与 $AD:BD$，设 $AD=2x$、$BD=3x$，由 $CD^{2}=AD\cdot BD$ 解出 $x$，再求各边。`,
      },
      {
        title: tex`用射影定理证勾股定理`,
        desc: tex`$AC^{2}+BC^{2}=AD\cdot AB+BD\cdot AB=AB(AD+BD)=AB^{2}$，这是勾股定理的一种相似证法。`,
      },
      {
        title: tex`一般三角形作高不是母子型`,
        desc: tex`若 $\angle ACB\ne90^{\circ}$，作高后两个小直角三角形不再相似，也没有 $CD^{2}=AD\cdot BD$，不能套用。`,
      },
    ],
    pitfalls: [
      tex`把 $CD^{2}=AD\cdot BD$ 记成 $CD^{2}=AD\cdot AB$，三条式子混用。`,
      tex`$D$ 不是垂足、或 $D$ 不在 $AB$ 上时仍套射影定理。`,
      tex`漏掉 $\angle ACB=90^{\circ}$ 这个前提（或误以为任意三角形的高都有这三条式子）。`,
      tex`$\frac{AC^{2}}{BC^{2}}=\frac{AD}{BD}$ 写成 $\frac{AC}{BC}=\frac{AD}{BD}$，漏掉平方。`,
    ],
    related: ["similar-basic", "anti-a", "area-method", "hypotenuse-median"],
    tags: [tex`相似`, tex`射影定理`, tex`直角三角形`, tex`母子型`],
  },
  {
    id: "parallel-ratio",
    name: "平行线分线段成比例（比例基本定理）",
    alias: ["平行线分线段成比例定理", "三条平行线模型"],
    categories: ["similarity"],
    grade: "八年级下",
    difficulty: 2,
    importance: 3,
    mnemonic: tex`三条平行线截两刀，上比下、上比全，左右对应不能倒。`,
    summary: tex`三条平行线截两条直线，截得的对应线段成比例。它是 A 字、8 字模型共同的“比例源头”，也是用面积法证明比例关系的经典范例。属于八、九年级衔接的拓展内容：八年级先用它算线段比，九年级再用相似三角形解释“为什么”。`,
    definition: tex`如图，三条平行线 $l_{1}\parallel l_{2}\parallel l_{3}$ 截两条直线，交点依次为 $A$、$B$、$C$ 与 $D$、$E$、$F$（$A$、$D$ 在 $l_{1}$ 上，$B$、$E$ 在 $l_{2}$ 上，$C$、$F$ 在 $l_{3}$ 上），则 $\frac{AB}{BC}=\frac{DE}{EF}$。由合比还得到 $\frac{AB}{AC}=\frac{DE}{DF}$、$\frac{BC}{AC}=\frac{EF}{DF}$。一句话：被平行线截出的“对应线段”成比例。`,
    conditions: [
      tex`三条直线互相平行（$l_{1}\parallel l_{2}\parallel l_{3}$）`,
      tex`两条截线被这三条平行线依次截出 $A$、$B$、$C$ 与 $D$、$E$、$F$`,
      tex`要求“上比下”（$AB:BC$）或“上比全”（$AB:AC$）的线段比`,
      tex`常与 A 字、8 字、三角形中位线一起出现`,
      tex`或者要用比例式反推平行（仅在三角形内可直接逆用）`,
    ],
    triggers: [
      tex`三条平行线`,
      tex`截线`,
      tex`对应线段`,
      tex`成比例`,
      tex`上比下`,
      tex`合比`,
      tex`等距`,
    ],
    figure: "parallel-ratio",
    auxSteps: [
      {
        step: 1,
        title: tex`连出四个三角形`,
        detail: tex`连接 $AE$、$BD$、$CE$、$BF$，把线段 $AB$、$BC$ 与 $DE$、$EF$ 分别放进三角形里。`,
        gain: tex`线段的比被转化成三角形面积的比`,
      },
      {
        step: 2,
        title: tex`用“同底等高”搬面积`,
        detail: tex`$l_{1}\parallel l_{2}$ 得 $S_{\triangle ABE}=S_{\triangle DBE}$（同底 $BE$、等高）；$l_{2}\parallel l_{3}$ 得 $S_{\triangle BCE}=S_{\triangle BEF}$（同底 $BE$、等高）。`,
        gain: tex`把“上面一组”与“下面一组”的面积对应起来`,
      },
      {
        step: 3,
        title: tex`写面积比、约去高`,
        detail: tex`$S_{\triangle ABE}=\frac{1}{2}AB\cdot d_{1}$，$S_{\triangle BCE}=\frac{1}{2}BC\cdot d_{2}$，两式相除后约去 $d_{1}$、$d_{2}$，得 $\frac{AB}{BC}=\frac{DE}{EF}$。`,
        gain: tex`得到定理结论，也看清“为什么与平行线间距无关”`,
      },
    ],
    whyAux: tex`线段比本身没有现成工具可用。连出三角形之后，平行线保证“同底等高”，面积比就退化成底边比，这是面积法最典型的一次应用：把“比例”问题翻译成“面积相等 + 面积公式”，两条平行关系各管一组等积，一约就出结果。`,
    newRelations: [
      tex`$\frac{AB}{BC}=\frac{DE}{EF}$`,
      tex`$\frac{AB}{AC}=\frac{DE}{DF}$`,
      tex`$\frac{BC}{AC}=\frac{EF}{DF}$`,
      tex`三角形内的推论：$DE\parallel BC$ 时 $\frac{AD}{DB}=\frac{AE}{EC}$，$\frac{AD}{AB}=\frac{AE}{AC}$`,
      tex`三角形内的逆用：$\frac{AD}{DB}=\frac{AE}{EC}$ 时 $DE\parallel BC$`,
      tex`三条平行线等距时，截得的对应线段相等（可用来证中点）`,
    ],
    theorems: [
      tex`平行线分线段成比例定理`,
      tex`比例的性质：合比`,
      tex`同底等高的三角形面积相等`,
      tex`三角形面积公式`,
      tex`平行线的性质（两直线平行，内错角相等）`,
    ],
    proof: {
      goal: tex`三条平行线 $l_{1}\parallel l_{2}\parallel l_{3}$ 截两条直线得 $A$、$B$、$C$ 与 $D$、$E$、$F$，求证 $\frac{AB}{BC}=\frac{DE}{EF}$。`,
      steps: [
        {
          s: tex`连接 $AE$、$BD$、$CE$、$BF$`,
          r: tex`作图：把线段比转化为面积比`,
        },
        {
          s: tex`$S_{\triangle ABE}=S_{\triangle DBE}$`,
          r: tex`同底 $BE$、等高：$A$、$D$ 都在 $l_{1}$ 上，$l_{1}\parallel l_{2}$`,
        },
        {
          s: tex`$S_{\triangle BCE}=S_{\triangle BEF}$`,
          r: tex`同底 $BE$、等高：$C$、$F$ 都在 $l_{3}$ 上，$l_{3}\parallel l_{2}$`,
        },
        {
          s: tex`$S_{\triangle ABE}=\frac{1}{2}AB\cdot d_{1}$，$S_{\triangle BCE}=\frac{1}{2}BC\cdot d_{2}$`,
          r: tex`三角形面积公式；$d_{1}$、$d_{2}$ 分别是 $l_{1}$ 与 $l_{2}$、$l_{2}$ 与 $l_{3}$ 之间的距离`,
        },
        {
          s: tex`$S_{\triangle DBE}=\frac{1}{2}DE\cdot d_{1}$，$S_{\triangle BEF}=\frac{1}{2}EF\cdot d_{2}$`,
          r: tex`同理：底 $DE$ 在 $l_{1}$ 上、底 $EF$ 在 $l_{3}$ 上，高都对应 $d_{1}$、$d_{2}$`,
        },
        {
          s: tex`$\frac{S_{\triangle ABE}}{S_{\triangle BCE}}=\frac{S_{\triangle DBE}}{S_{\triangle BEF}}$`,
          r: tex`等量代换：两组面积分别相等`,
        },
        {
          s: tex`$\frac{AB\cdot d_{1}}{BC\cdot d_{2}}=\frac{DE\cdot d_{1}}{EF\cdot d_{2}}$`,
          r: tex`代入面积表达式`,
        },
        {
          s: tex`$\frac{AB}{BC}=\frac{DE}{EF}$`,
          r: tex`两边约去 $\frac{1}{2}$、$d_{1}$、$d_{2}$`,
        },
      ],
      note: tex`由 $\frac{AB}{BC}=\frac{DE}{EF}$ 用合比得 $\frac{AB}{AB+BC}=\frac{DE}{DE+EF}$，即 $\frac{AB}{AC}=\frac{DE}{DF}$。注意“上比下”与“上比全”是两个不同的式子，代入数据前先想清楚要哪一种。`,
    },
    example: {
      problem: tex`如图，$l_{1}\parallel l_{2}\parallel l_{3}$，直线 $AC$ 与 $DF$ 分别被截出 $AB=3$、$BC=5$、$DE=4$。求 $EF$ 与 $DF$。`,
      given: tex`$A$、$D$ 在 $l_{1}$ 上，$B$、$E$ 在 $l_{2}$ 上，$C$、$F$ 在 $l_{3}$ 上。`,
      steps: [
        {
          s: tex`$\frac{AB}{BC}=\frac{DE}{EF}$，即 $\frac{3}{5}=\frac{4}{EF}$`,
          r: tex`平行线分线段成比例`,
        },
        { s: tex`$EF=\frac{20}{3}$`, r: tex`解比例（交叉相乘）` },
        { s: tex`$DF=DE+EF=4+\frac{20}{3}=\frac{24}{3}+\frac{20}{3}=\frac{32}{3}$`, r: tex`线段的和` },
        {
          s: tex`检验：$\frac{DE}{DF}=\frac{4}{32/3}=\frac{3}{8}$，而 $\frac{AB}{AC}=\frac{3}{8}$`,
          r: tex`合比式 $\frac{AB}{AC}=\frac{DE}{DF}$ 回代验证`,
        },
      ],
      conclusion: tex`$EF=\frac{20}{3}$，$DF=\frac{32}{3}$。若把比例写成 $\frac{AB}{BC}=\frac{EF}{DE}$，会得到 $EF=\frac{12}{5}$，虽然也是个“正常”的数，但对应位置写反了，这是本题最常见的错误。`,
    },
    variants: [
      {
        title: tex`三角形内的 A 字推论`,
        desc: tex`$DE\parallel BC$ 时 $\frac{AD}{DB}=\frac{AE}{EC}$，这就是 A 字模型的“上比下”版本。`,
      },
      {
        title: tex`逆用证平行`,
        desc: tex`三角形内已知 $\frac{AD}{DB}=\frac{AE}{EC}$，可证 $DE\parallel BC$；一般位置的逆命题不成立，不能乱用。`,
      },
      {
        title: tex`三条平行线等距`,
        desc: tex`若 $l_{1}$、$l_{2}$、$l_{3}$ 两两等距，则 $AB=BC$、$DE=EF$，可用来证中点或等分线段。`,
      },
      {
        title: tex`与 8 字结合`,
        desc: tex`梯形中两条对角线相交，先用 8 字得交点分线段的比，再用本定理处理平行边之间的线段。`,
      },
    ],
    pitfalls: [
      tex`比例式左右不对应：$\frac{AB}{BC}=\frac{EF}{DE}$ 是错的，应为 $\frac{DE}{EF}$。`,
      tex`把“上比下”与“上比全”混用，如 $\frac{AB}{BC}=\frac{DE}{DF}$。`,
      tex`只有两条平行线时直接套三条平行线的结论（此时应改用 A 字或 8 字）。`,
      tex`把“三角形内的逆用”推广到一般位置：$\frac{AB}{BC}=\frac{DE}{EF}$ 一般不能反推三条直线平行。`,
    ],
    related: ["a-shape", "eight-shape", "area-method", "midline"],
    tags: [tex`比例`, tex`平行线`, tex`面积法`, tex`线段比`],
  },
  {
    id: "area-method",
    name: "面积法与等积式（同高面积比）",
    alias: ["同高模型", "面积比转线段比"],
    categories: ["similarity"],
    grade: "八年级下",
    difficulty: 2,
    importance: 3,
    mnemonic: tex`同高不同底，面积比就是底边比；算两次面积，等式一约线段出。`,
    summary: tex`两个三角形若高相同，面积比就等于底边比。把这句话正用、反用、与相似结合用，就是“面积法”：它能求线段比、证中点、证等积式、证角平分线定理。属于八、九年级衔接的拓展内容，八年级可先用它算面积比，九年级再与相似三角形的面积比合并使用。`,
    definition: tex`如图，$D$ 是 $BC$ 上一点，$\triangle ABD$ 与 $\triangle ACD$ 有公共顶点 $A$，底边 $BD$、$DC$ 在同一条直线 $BC$ 上，所以它们的高相同，于是 $\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{BD}{DC}$。反过来，面积比也能翻译成线段比；若两个三角形面积相等且同高，则底边相等。这就是面积法的两条基本用法。`,
    conditions: [
      tex`两个三角形有公共顶点，底边在同一条直线上（“同高”）`,
      tex`要求线段比、面积比，或已知面积求线段`,
      tex`要证明“等积式”，如 $AB\cdot CD=AC\cdot BD$`,
      tex`图中出现中线、角平分线、等分点等“分割”结构`,
      tex`一个图形被一条线分成两块，需要比较两块的大小`,
    ],
    triggers: [
      tex`同高`,
      tex`面积比`,
      tex`底边比`,
      tex`等积式`,
      tex`分割`,
      tex`中线`,
      tex`角平分线`,
    ],
    figure: "area-method",
    auxSteps: [
      {
        step: 1,
        title: tex`连一条线，把图形分成两块`,
        detail: tex`连接 $AD$，把 $\triangle ABC$ 分成 $\triangle ABD$ 与 $\triangle ACD$，它们共顶点 $A$、底边都在 $BC$ 上。`,
        gain: tex`得到两个“同高”三角形，面积比可以互相转化`,
      },
      {
        step: 2,
        title: tex`作高，把面积写成“底 $\times$ 高”`,
        detail: tex`过 $A$ 作 $AH\perp BC$ 于 $H$。两个三角形的高都是 $AH$，写面积时高可以约掉。`,
        gain: tex`$\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{\frac{1}{2}BD\cdot AH}{\frac{1}{2}DC\cdot AH}=\frac{BD}{DC}$`,
      },
      {
        step: 3,
        title: tex`按需要把面积比翻译成线段比`,
        detail: tex`求面积时用“底边比 = 面积比”；证等积式时改写成 $\frac{1}{2}AB\cdot CD=\frac{1}{2}AC\cdot BD$ 的形式，或用夹角面积公式。`,
        gain: tex`同一个工具既能求值，也能出证明`,
      },
    ],
    whyAux: tex`面积法的核心是“算两次”：同一个三角形用两种底、两种高算面积，或者两个三角形用同一个高算面积，等式两边一约，线段比就出来了。作高是把“面积”变成“底 $\times$ 高”的唯一通道，所以哪怕题目没画高，也要在推理里补出来。`,
    newRelations: [
      tex`$\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{BD}{DC}$`,
      tex`$\frac{S_{\triangle ABD}}{S_{\triangle ABC}}=\frac{BD}{BC}$`,
      tex`$D$ 是 $BC$ 中点时 $S_{\triangle ABD}=S_{\triangle ACD}=\frac{1}{2}S_{\triangle ABC}$`,
      tex`$AD$ 平分 $\angle BAC$ 时 $\frac{AB}{AC}=\frac{BD}{DC}$（角平分线定理，面积法证明）`,
      tex`相似三角形面积比等于相似比的平方`,
      tex`等高三角形的面积比等于底边比（同一原理的另一说法）`,
    ],
    theorems: [
      tex`三角形面积公式`,
      tex`同底等高的三角形面积相等`,
      tex`比例的性质`,
      tex`角平分线的定义`,
      tex`相似三角形面积比等于相似比平方`,
    ],
    proof: {
      goal: tex`已知 $D$ 在 $BC$ 上，$AH\perp BC$ 于 $H$，求证 $\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{BD}{DC}$。`,
      steps: [
        {
          s: tex`$S_{\triangle ABD}=\frac{1}{2}BD\cdot AH$，$S_{\triangle ACD}=\frac{1}{2}DC\cdot AH$`,
          r: tex`三角形面积公式；两个三角形的高都是 $AH$`,
        },
        {
          s: tex`$\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{\frac{1}{2}BD\cdot AH}{\frac{1}{2}DC\cdot AH}=\frac{BD}{DC}$`,
          r: tex`代入后约去 $\frac{1}{2}$ 与 $AH$`,
        },
        {
          s: tex`结论与 $AH$ 的具体长度无关，对 $BC$ 上任意一点 $D$ 都成立`,
          r: tex`等式两边同时约去了同一个量`,
        },
        {
          s: tex`若 $D$ 是 $BC$ 中点，则 $BD=DC$，$S_{\triangle ABD}=S_{\triangle ACD}$`,
          r: tex`等底等高`,
        },
        {
          s: tex`反之，若 $S_{\triangle ABD}=S_{\triangle ACD}$，则 $BD=DC$，$D$ 是 $BC$ 中点`,
          r: tex`同高，面积相等则底相等`,
        },
        {
          s: tex`若 $AD$ 平分 $\angle BAC$，则 $\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{\frac{1}{2}AB\cdot AD\sin\angle BAD}{\frac{1}{2}AC\cdot AD\sin\angle CAD}=\frac{AB}{AC}$`,
          r: tex`两边夹角面积公式；$\angle BAD=\angle CAD$，正弦值相等`,
        },
        {
          s: tex`结合 $\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{BD}{DC}$，得 $\frac{AB}{AC}=\frac{BD}{DC}$`,
          r: tex`等量代换，即角平分线定理`,
        },
      ],
      note: tex`面积法不写“作高”也能用：只要两个三角形“同高”，面积比就直接等于底边比。但初学时要写出高、说明“高为什么相等”，否则容易被判“理由不充分”。`,
    },
    example: {
      problem: tex`如图，$D$ 在 $BC$ 上，$BD=4$，$DC=6$，$S_{\triangle ABD}=12$。求 $S_{\triangle ACD}$；若 $AD$ 平分 $\angle BAC$ 且 $AB=8$，求 $AC$。`,
      given: tex`$D$ 在 $BC$ 上，$\triangle ABD$ 与 $\triangle ACD$ 同高。`,
      steps: [
        { s: tex`作 $AH\perp BC$ 于 $H$`, r: tex`作高，把面积写成“底 $\times$ 高”` },
        {
          s: tex`$S_{\triangle ABD}=\frac{1}{2}\cdot BD\cdot AH=12$，即 $2AH=12$，得 $AH=6$`,
          r: tex`三角形面积公式`,
        },
        {
          s: tex`$S_{\triangle ACD}=\frac{1}{2}\cdot DC\cdot AH=\frac{1}{2}\times6\times6=18$`,
          r: tex`同一个高，面积与底成正比`,
        },
        {
          s: tex`$\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{12}{18}=\frac{2}{3}=\frac{BD}{DC}=\frac{4}{6}$`,
          r: tex`检验同高面积比等于底边比`,
        },
        {
          s: tex`$\frac{S_{\triangle ABD}}{S_{\triangle ACD}}=\frac{\frac{1}{2}AB\cdot AD\sin\angle BAD}{\frac{1}{2}AC\cdot AD\sin\angle CAD}=\frac{AB}{AC}$`,
          r: tex`夹角面积公式；$AD$ 平分 $\angle BAC$，两正弦相等`,
        },
        {
          s: tex`$\frac{AB}{AC}=\frac{BD}{DC}=\frac{2}{3}$，即 $\frac{8}{AC}=\frac{2}{3}$，得 $AC=12$`,
          r: tex`角平分线定理（由面积法得到）`,
        },
      ],
      conclusion: tex`$S_{\triangle ACD}=18$，$AC=12$。本题两步用了面积法的两种形态：先“同高比底”求面积，再“夹角面积”导出角平分线定理。`,
    },
    variants: [
      {
        title: tex`中线等分面积`,
        desc: tex`$D$ 是 $BC$ 中点时，$AD$ 把 $\triangle ABC$ 分成面积相等的两块，这是“中线等分面积”的证明。`,
      },
      {
        title: tex`角平分线定理`,
        desc: tex`$AD$ 平分 $\angle BAC$ ⇒ $\frac{AB}{AC}=\frac{BD}{DC}$，用面积法证明只需三行，比作平行线更快。`,
      },
      {
        title: tex`等积式证明`,
        desc: tex`把同一个面积算两次（如 $\frac{1}{2}AB\cdot CD=\frac{1}{2}AC\cdot BD$），即可得到线段乘积相等的等积式。`,
      },
      {
        title: tex`相似 + 面积比`,
        desc: tex`先用相似求相似比，再用“面积比 = 相似比平方”，与“同高比底”联立可求复杂图形的面积。`,
      },
    ],
    pitfalls: [
      tex`两个三角形不同高时直接用底边比（必须先说明“同高”，或补作高证明高相等）。`,
      tex`面积比与相似比混用：面积比是相似比的平方，不是相似比。`,
      tex`点在 $BC$ 的延长线上时，底边比要改成“和”或“差”，不能照搬 $BD:DC$。`,
      tex`用面积法证角平分线定理时漏写 $\angle BAD=\angle CAD$ ⇒ 两个正弦相等这一步。`,
    ],
    related: ["a-shape", "altitude-projection", "parallel-ratio", "bisector-property"],
    tags: [tex`面积法`, tex`同高`, tex`等积式`, tex`角平分线`],
  },
];
