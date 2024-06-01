# Generative Art with p5.js

Author: Dony Hsieh

## 簡介

2024 S2 區塊鏈原理與數位藝術 期末報告題材，使用 p5.js 製作的生成式藝術專案。

## 安裝與執行

詳見官方說明 ( https://github.com/processing/p5.js/wiki/Local-server ) 建構簡易 local server 來執行。

## 參數說明

可調整參數位於 sketch.js 檔案頂部。

- **CANVAS_SIZE**: 正方形畫布尺寸 (pixel)。
- **BOUNDARY_CIRCLE_SIZE**: 圓形繪製區域的直徑 (pixel)。
- **TRACK_INIT_BEGIN_ANG**: 圓形軌跡的起始方位角 (degree)。
- **TRACK_BASE_SPACING**: 每條圓形軌跡的間距 (pixel)。
- **TRACK_LENGTH_UNIT**: 以角度表示的圓形軌跡的單位弧長 (degree)。
- **TRACK_MAX_STROKE_SIZE**: 圓形軌跡的最大寬度 (pixel)。
- **EAF_NOISE_FACTOR_X**: EndAngleFactor 的 X 軸噪聲係數 (integer/float)。
- **EAF_NOISE_FACTOR_Y**: EndAngleFactor 的 Y 軸噪聲係數 (integer/float)。
- **BAS_NOISE_FACTOR_X**: BeginAngleStep 的 X 軸噪聲係數 (integer/float)。
- **BAS_NOISE_FACTOR_Y**: BeginAngleStep 的 Y 軸噪聲係數 (integer/float)。
- **BEGIN_ANG_STEP_UNIT**: 圓形軌跡之起始方位角的單位變化步長 (degree)。
- **INV_TRACK_DO_FILL_MODE**: 反向圓形軌跡的繪製模式，false 為線條、true 為扇形 (boolean)。
- **INV_TRACK_ANG_OFS**: 反向圓形軌跡相對於正向圓形軌跡的方位角偏移量 (degree)。
- **INV_TRACK_ALPHA_FACTOR**: 反向圓形軌跡的色彩透明度係數 (float)。
- **RAND_COLOR_MIN_ALPHA**: 隨機色彩程序的最小透明度值 (0~255)。
- **BACKGROUND_GREY_SCALE**: 畫布的背景灰階值 (0~255)。
- **DO_ANIM_DRAW**: 以動畫模式繪製 (boolean)。
- **BASE_ANIM_DT_SCALE**: 基礎動畫速度，控制 frameCount 的倍率 (float)。
- **MAX_ANIM_DT_SCALE_FACTOR**: 更細微的動畫速度控制係數 (integer/float)。
