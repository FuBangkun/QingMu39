import { state, setState } from "~/store";
import { Collapse, CollapsePanel } from "~/components/ui/Collapse";
import { RadioGroup } from "~/components/ui/RadioGroup";
import { Toggle } from "~/components/ui/Toggle";
import { toast } from "~/components/ui/Toast";

function SwitchRow(props: { text: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div class="item">
      <span class="text">{props.text}</span>
      <Toggle checked={props.checked} onChange={props.onChange} />
    </div>
  );
}

/** 设置表单面板（原 Set.vue） */
export function Set() {
  return (
    <div class="setting">
      <Collapse accordion activeName="1">
        <CollapsePanel title="个性壁纸" name="1">
          <div class="bg-set">
            <RadioGroup
              value={state.coverType}
              size="large"
              options={[
                { value: "0", label: "默认壁纸" },
                { value: "1", label: "每日一图" },
                { value: "2", label: "随机风景" },
                { value: "3", label: "随机动漫" },
              ]}
              onChange={(v) => {
                setState({ coverType: v });
                toast("壁纸更换成功", { type: "success" });
              }}
            />
          </div>
        </CollapsePanel>

        <CollapsePanel title="个性化调整" name="2">
          <SwitchRow
            text="建站日期显示"
            checked={state.siteStartShow}
            onChange={(v) => setState({ siteStartShow: v })}
          />
          <SwitchRow
            text="音乐点击是否打开面板"
            checked={state.musicClick}
            onChange={(v) => setState({ musicClick: v })}
          />
          <SwitchRow
            text="底栏歌词显示"
            checked={state.playerLrcShow}
            onChange={(v) => setState({ playerLrcShow: v })}
          />
          <SwitchRow
            text="底栏背景模糊"
            checked={state.footerBlur}
            onChange={(v) => setState({ footerBlur: v })}
          />
        </CollapsePanel>

        <CollapsePanel title="播放器配置" name="3">
          <SwitchRow
            text="自动播放"
            checked={state.playerAutoplay}
            onChange={(v) => setState({ playerAutoplay: v })}
          />
          <SwitchRow
            text="随机播放"
            checked={state.playerOrder === "random"}
            onChange={(v) => setState({ playerOrder: v ? "random" : "list" })}
          />
          <div class="item">
            <span class="text">循环模式</span>
            <RadioGroup
              value={state.playerLoop}
              size="small"
              options={[
                { value: "all", label: "列表" },
                { value: "one", label: "单曲" },
                { value: "none", label: "不循环" },
              ]}
              onChange={(v) => setState({ playerLoop: v })}
            />
          </div>
        </CollapsePanel>

        <CollapsePanel title="其他设置" name="4">
          <div>设置内容待增加</div>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}